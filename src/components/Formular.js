import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarContent,
  Typography,
  makeStyles,
  Dialog,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Attribute from "./Attribute";
import React, { useEffect, useState, useRef } from "react";
import Buttons from "./Buttons";
import { openDatabase, addSubmission, getAllSubmissions } from "../db";
import JSZip from "jszip";

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

export const SimpleDialog = (props, ref) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    photo: null,
  });
  // Separate state for each attribute
  const [streckennummer, setStreckennummer] = useState("");
  const [km, setKm] = useState("");
  const [met, setMet] = useState("");
  const [seite, setSeite] = useState(false);
  const [sonstiges, setSonstiges] = useState("");
  const [punktnummer, setPunktnummer] = useState("");
  const [gvp, setGVP] = useState("");
  const [photo, setPhoto] = useState(null);
  const { onClose, selectedValue, open } = props;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState([]); // Store all submissions
  const [successOpen, setSuccessOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
  }, [currentDate, setCurrentDate]);

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setPhoto((prevFormData) => ({
      ...prevFormData,
      photo,
    }));
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

  const reff = useRef(null);

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage("");
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
            streckennummer: streckennummer,
            km: km,
            met: met,
            seite: seite,
            sonstiges: sonstiges,
            punktnummer: punktnummer,
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
    reader.readAsDataURL(formData.photo);
    reff.current.value = "";
  };

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
      setTimeout(() => {
        link.click();
      }, 100);
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
      setTimeout(() => {
        link.click();
      }, 100);
    });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="400px"
        margin="0 auto"
        padding="20px"
        marginTop="10px"
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
      >
        <Attribute
          name="Streckennummer"
          value={streckennummer}
          setValue={setStreckennummer}
        />
        <Typography variant="h6" className={classes.title}>
          Kilometrierung
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <TextField
            required
            value={km}
            style={{ marginRight: "5px" }}
            id="km"
            name="km"
            placeholder="z.B. 145"
            onChange={(e) => setKm(e.target.value)}
            inputProps={{ style: { textAlign: "center" } }}
          />
          <Typography>, </Typography>
          <TextField
            required
            value={met}
            style={{ marginLeft: "5px" }}
            id="met"
            name="met"
            placeholder="02"
            onChange={(e) => setMet(e.target.value)}
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
            value={sonstiges}
            onChange={(e) => setSonstiges(e.target.value)}
            label="Sonstiges"
            id="sonstiges"
            name="sonstiges"
            InputLabelProps={{
              style: { textAlign: "center", width: "100%", marginLeft: "0" },
            }}
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Box>
        <br></br>
        <Attribute
          name="Punktnummer"
          value={punktnummer}
          setValue={setPunktnummer}
        />
        <br></br>
        <Attribute name="GVP Länge, mm" value={gvp} setValue={setGVP} />
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
    </Dialog>
  );
};

export default SimpleDialog;