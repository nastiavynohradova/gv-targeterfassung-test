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

const MainForm = ({
  reff,
  row,
}) => {

  const [formData, setFormData] = useState({
    seite: false,
    sonstiges: "",
    gvp: "",
    photo: null,
  });

  const [streckennummer, setStreckennummer] = useState(row.Streckennummer ? row.Streckennummer : "");
  const [km, setKm] = useState(row.Km ? row.Km : "");
  const [met, setMet] = useState(row.Met ? row.Met : "");
  const [seite, setSeite] = useState("");
  const [sonstiges, setSonstiges] = useState("");
  const [punktnummer, setPunktnummer] = useState(row.Punktnummer ? row.Punktnummer : "");
  const [gvp, setGVP] = useState("");
  const [photo, setPhoto] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const [submissions, setSubmissions] = useState([]); // Store all submissions

  // State for displaying the success and error message
  const [successOpen, setSuccessOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
    if (row) {
      // Autofill "Punktnummer" if available
      if (row.Punktnummer) {
        setPunktnummer(row.Punktnummer);
      }
      if (row.Kilometrierungwert) {
        const [kmValue, meterValue] = row.Kilometrierungwert.split(",");
        setKm(kmValue);
        setMet(meterValue);
      }
      if (row.Seite) {
        setSeite(row.Seite);
      }
    }
  }, [row, setCurrentDate]);

  const classes = useStyles(); // Initialize the useStyles

  const downloadCombinedTodayData = () => {
    const zip = new JSZip();
    const todaySubmissions = submissions.filter(
      (entry) => entry.currentDate === currentDate
    );

    // Add the CSV data to the ZIP file
    const csvContent =
      "Streckennummer;Kilometrierung; Seite; Sonstiges; Punktnummer; GVP Länge; Datum\n" +
      todaySubmissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.punktnummer};${gvpInMeters};${currentDate}`;
        })
        .join("\n");

    zip.file(`${currentDate}.csv`, csvContent);

    // Add the image files to the ZIP file
    todaySubmissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      const filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.punktnummer}_${date}.jpg`;
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
      link.click();
    });
  };

  const downloadCombinedData = () => {
    const zip = new JSZip();
    // Add the CSV data to the ZIP file
    const csvContent =
      "Streckennummer;Kilometrierung; Seite; Sonstiges; Punktnummer; GVP Länge; Datum\n" +
      submissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.punktnummer};${gvpInMeters};${entry.currentDate}`;
        })
        .join("\n");

    zip.file("alle_daten.csv", csvContent);

    // Add the image files to the ZIP file
    submissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      const filename = `${el.streckennummer}_${el.km},${el.met}_${el.seite}_${el.punktnummer}_${date}.jpg`;
      const base64Data = el.photo.split(",")[1];
      zip.file(filename, base64Data, { base64: true });
    });

    // Create and trigger a download link for the ZIP file
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "combined_data.zip";
      link.click();
    });
  };

  const handleSubmit = () => {
    // Check if a photo is selected
    if (!formData.photo) {
      setErrorMessage("Bitte wählen Sie ein Foto aus, bevor Sie fortfahren.");
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    // Clear the error message if a photo is selected
    setErrorMessage("");
    setSuccessMessage("Erfolgreich hinzugefügt");
    // Reset the form after a successful submission
    resetForm();

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
          // Append new submission to the array
          const newSubmission = {
            streckennummer,
            km,
            met,
            seite,
            sonstiges,
            punktnummer,
            gvp,
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
    reader.readAsDataURL(formData.photo);
    reff.current.value = "";
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
    const photo = e.target.files[0];
    setFormData({
      ...formData,
      photo,
    });
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
        <Attribute value={streckennummer} setValue={setStreckennummer} name="Streckennummer" />
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
              onChange={handleInputChange}
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
            value={formData.sonstiges}
            onChange={formData.handleChange}
          />
        </Box>
        <br></br>
        <Attribute value={punktnummer} setValue={setPunktnummer} name="Punktnummer" />
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
