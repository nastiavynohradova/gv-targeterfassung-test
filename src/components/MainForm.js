import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarContent,
  Typography,
  makeStyles, // Import makeStyles
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import JSZip from "jszip";
import { openDatabase, addSubmission, getAllSubmissions } from "../db";
import Attribute from "./Attribute";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem", // Adjust the font size
    marginBottom: "5px", // Add some spacing below titles
  },
  textField: {
    marginBottom: "1px", // Add margin to text fields
  },
}));

const MainForm = ({ reff, row, setImportData }) => {
  const [formData, setFormData] = useState({
    seite: false,
    sonstiges: "",
    gvp: "",
    photo: null,
  });

  const [streckennummer, setStreckennummer] = useState(
    row.Streckennummer ? row.Streckennummer : ""
  );
  const [km, setKm] = useState(
    row["Km-Station Ist"] ? row["Km-Station Ist"] : ""
  );
  const [met, setMet] = useState(row.Met ? row.Met : "");
  const [seite, setSeite] = useState("");
  const [sonstiges, setSonstiges] = useState("");
  const [mastnummer, setMastnummer] = useState("");
  const [selectedVermarkungstrager, setselectedVermarkungstrager] =
    useState(null);
  const [sonstiges2, setSonstiges2] = useState("");
  const [gvp, setGVP] = useState("");
  const [photo, setPhoto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState([]); // Store all submissions

  useEffect(() => {
    setImportData((state) =>
      state.map((el) => {
        if (el.id === row.id) {
          return {
            ...el,
            "GVP Länge": gvp,
          };
        }
        if (el.id === row.id) {
          return {
            ...el,
            Mastnummer: mastnummer,
          };
        }
        return el;
      })
    );
  }, [gvp, mastnummer, row.id, setImportData]);

  // State for displaying the success and error message
  const [successOpen, setSuccessOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
    if (row) {
      if (row["Km-Station Ist"]) {
        const [kmValue, meterValue] = row["Km-Station Ist"].split(",");
        setKm(kmValue);
        setMet(meterValue);
      }
      if (row.Seite) {
        setSeite(row.Seite);
      }
    }
  }, [row, setCurrentDate]);

  const classes = useStyles(); // Initialize the useStyles

  const vermarkungOptions = [
    { value: 10, label: "Keiner" },
    { value: 20, label: "Laterne" },
    { value: 30, label: "Wand" },
    { value: 40, label: "Fundament" },
    { value: 50, label: "Lärmschutzwand" },
    { value: 60, label: "Widerlager" },
    { value: 70, label: "Sonstiges" },
  ];

  const handleChange = (event) => {
    setselectedVermarkungstrager(event.target.value);
    if (event.target.value) {
      setMastnummer(""); // Reset Mastnummer when Vermarkungstrager is selected
    }
  };

  const handleSubmit = () => {
    // Check if a photo is selected
    if (!photo) {
      setErrorMessage("Bitte wählen Sie ein Foto aus, bevor Sie fortfahren.");
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    // Clear the error message if a photo is selected
    setErrorMessage("");
    setSuccessMessage("Erfolgreich hinzugefügt");
    // Reset the form after a successful submission
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Photo = event.target.result;
      const maxSizeInBytes = 0.5 * 1024 * 1024; // 0.5 MB
      let quality = 0.9;

      const image = new Image();
      image.src = base64Photo;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);
        // Convert the canvas content to a data URL with JPEG format
        let compressedPhoto = canvas.toDataURL("image/jpeg", quality);

        while (compressedPhoto.length > maxSizeInBytes && quality >= 0.1) {
          // Reduce quality and recompress
          quality -= 0.1;
          compressedPhoto = canvas.toDataURL("image/jpeg", quality);
        }

        if (compressedPhoto.length <= maxSizeInBytes) {
          const vermarkungLabel = selectedVermarkungstrager
            ? vermarkungOptions.find(
                (option) => option.value === selectedVermarkungstrager
              )?.label
            : "";

          // Append new submission to the array
          const newSubmission = {
            streckennummer: streckennummer,
            km: km,
            met: met,
            seite: seite,
            sonstiges: sonstiges,
            mastnummer: mastnummer,
            selectedVermarkungstrager: vermarkungLabel,
            sonstiges2: sonstiges2,
            gvp: gvp,
            currentDate: currentDate,
            photo: compressedPhoto,
          };
          // Save to IndexedDB each time the user submits
          openDatabase()
            .then((db) => {
              addSubmission(db, newSubmission)
                .then(() => {
                  // Fetch updated submissions
                  getAllSubmissions(db)
                    .then((data) => {
                      setSubmissions(data);
                      setSuccessMessage("Erfolgreich hinzugefügt");
                      setSuccessOpen(true);
                    })
                    .catch((error) =>
                      console.error("Error fetching submissions: ", error)
                    );
                })
                .catch((error) =>
                  console.error("Error adding submission: ", error)
                );
            })
            .catch((error) => console.error("Error opening database: ", error));
        } else {
          console.error("Compressed photo size is still too large.");
          // Handle the situation where the photo can't be compressed to the desired size.
        }
      };
    };
    reader.readAsDataURL(photo);
    reff.current.value = "";
  };

  const downloadCombinedTodayData = () => {
    const zip = new JSZip();
    const todaySubmissions = submissions.filter(
      (entry) => entry.currentDate === currentDate
    );

    // Add the CSV data to the ZIP file
    const csvContent =
      "Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP Länge; Datum\n" +
      todaySubmissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.mastnummer};${entry.selectedVermarkungstrager};${entry.sonstiges2};${gvpInMeters};${currentDate}`;
        })
        .join("\n");

    zip.file(`${currentDate}.csv`, csvContent);

    // Add the image files to the ZIP file
    todaySubmissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      let filename;

      if (el.mastnummer) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.mastnummer}_${date}.jpg`;
      } else if (
        el.selectedVermarkungstrager &&
        el.selectedVermarkungstrager !== "Sonstiges"
      ) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.selectedVermarkungstrager}_${date}.jpg`;
      } else if (el.sonstiges2) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.sonstiges2}_${date}.jpg`;
      } else {
        // Handle the case when none of the conditions are met
        console.error("Invalid submission data");
        return;
      }
      const base64Data = el.photo.split(",")[1];
      zip.file(filename, base64Data, { base64: true });
    });

    // Create and trigger a download link for the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
      const cur_date = new Date().toISOString().slice(0, 10);
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${cur_date}.zip`;
      setTimeout(() => {
        link.click();
      }, 100);
    });
  };

  const downloadCombinedData = () => {
    const zip = new JSZip();
    // Add the CSV data to the ZIP file
    const csvContent =
      "Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP Länge; Datum\n" +
      submissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.mastnummer};${entry.selectedVermarkungstrager};${entry.sonstiges2};${gvpInMeters};${entry.currentDate}`;
        })
        .join("\n");

    zip.file("alle_daten.csv", csvContent);

    // Add the image files to the ZIP file
    submissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      let filename;

      if (el.mastnummer) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.mastnummer}_${date}.jpg`;
      } else if (
        el.selectedVermarkungstrager &&
        el.selectedVermarkungstrager !== "Sonstiges"
      ) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.selectedVermarkungstrager}_${date}.jpg`;
      } else if (el.sonstiges2) {
        filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.sonstiges2}_${date}.jpg`;
      } else {
        // Handle the case when none of the conditions are met
        console.error("Invalid submission data");
        return;
      }
      const base64Data = el.photo.split(",")[1];
      zip.file(filename, base64Data, { base64: true });
    });

    // Create and trigger a download link for the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "combined_data.zip";
      setTimeout(() => {
        link.click();
      }, 100);
    });
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage("");
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };

  const resetForm = () => {
    setFormData({
      km: "",
      met: "",
      seite: "",
      sonstiges: "",
      punktnummer: "",
      gvp: "",
      photo: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const photoFile = e.target.files[0];
    setPhoto(photoFile);
  };

  useEffect(() => {
    openDatabase()
      .then((db) => {
        getAllSubmissions(db).then((data) => setSubmissions(data));
      })
      .catch((error) => console.error("Error opening database: ", error));
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="400px"
        margin="0 auto"
        padding="20px"
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
      >
        <Attribute
          value={streckennummer}
          setValue={setStreckennummer}
          name="Streckennummer"
        />
        {/* <Attribute value={km} setValue={setKm} name="Km" /> */}
        <Typography variant="h6" className={classes.title}>
          Kilometrierung
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <TextField
            required
            style={{ marginRight: "5px" }}
            id="km"
            name="km"
            placeholder="z.B. 145"
            value={km}
            onChange={handleInputChange}
            inputProps={{ style: { textAlign: "center" } }}
          />
          <Typography>, </Typography>
          <TextField
            required
            style={{ marginLeft: "5px" }}
            id="met"
            name="met"
            placeholder="02"
            value={met}
            onChange={handleInputChange}
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Box>
        <br></br>
        <Typography variant="h6" className={classes.title}>
          Seite
        </Typography>

        <Box display="flex" flexDirection="row" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              row
              required
              id="seite"
              name="seite"
              value={seite}
              onChange={(e) => setSeite(e.target.value)}
            >
              <FormControlLabel value="L" control={<Radio />} label="L" />
              <FormControlLabel value="R" control={<Radio />} label="R" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Sonstiges"
            id="sonstiges"
            name="sonstiges"
            value={sonstiges}
            onChange={(e) => setSonstiges(e.target.value)}
            inputProps={{ style: { textAlign: "center" } }}
            InputLabelProps={{
              style: { textAlign: "center", width: "100%", marginLeft: "0" },
            }}
          />
        </Box>
        <br></br>
        <Attribute
          name="Mastnummer"
          value={mastnummer}
          setValue={setMastnummer}
          disabled={
            selectedVermarkungstrager !== null &&
            selectedVermarkungstrager !== 10
          }
        />
        <Typography variant="h6" className={classes.title}>
          Wenn keine Mastnummer vorhanden ist, dann Vermarkungsträger auswählen:
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Vermarkungsträger
          </InputLabel>
          <Select
            labelId="vermarkungstraeger"
            id="vermarkungstraeger"
            value={selectedVermarkungstrager}
            label="Vermarkung"
            onChange={(event) => handleChange(event)}
            disabled={!!mastnummer}
          >
            {vermarkungOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Attribute
          name="Sonstiges"
          value={sonstiges2}
          setValue={setSonstiges2}
          disabled={selectedVermarkungstrager !== 70}
        />
        <br></br>
        <Attribute value={gvp} setValue={setGVP} name="GVP Länge, mm" />
        <br></br>
        <Typography variant="h6" className={classes.title}>
          Datum
        </Typography>
        <br></br>
        <TextField
          required
          fullWidth
          name="currentDate"
          placeholder="z.B. 2023-10-20"
          value={currentDate}
          onChange={(e) => {
            setCurrentDate(e.target.value);
          }}
          margin="normal"
          inputProps={{ style: { textAlign: "center" } }}
        />
        <br></br>
        <Typography variant="h6" className={classes.title}>
          Foto hochladen
        </Typography>

        <input
          ref={(el) => (reff.current = el)}
          required
          type="file"
          name="photo"
          accept="image/*;capture=camera"
          onChange={handlePhotoChange}
        />
      </Box>
      <Buttons
        handleSubmit={handleSubmit}
        downloadCombinedData={downloadCombinedData}
        downloadCombinedTodayData={downloadCombinedTodayData}
      />
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <SnackbarContent
          message={successMessage}
          /*           className={classes.successSnackbar} */
        />
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <SnackbarContent
          message={errorMessage}
          /*           className={classes.errorSnackbar} */
        />
      </Snackbar>
    </>
  );
};

export default MainForm;
