import { Box, Paper } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import MainForm from "./components/MainForm";
import { openDatabase, addSubmission, getAllSubmissions } from "./db";
import JSZip from "jszip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    "& > *": {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

// Function to clear the IndexedDB
const clearIndexedDB = async (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["submissions"], "readwrite");
    const objectStore = transaction.objectStore("submissions");

    const request = objectStore.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

function App() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    streckennummer: "",
    km: "",
    met: "",
    seite: false,
    sonstiges: "",
    punktnummer: "",
    gvp: "",
    photo: null,
  });
  const reff = useRef(null);

  useEffect(() => {
    const clearDatabaseEvery2Weeks = async () => {
      try {
        const db = await openDatabase();
        await clearIndexedDB(db);
        console.log("IndexedDB cleared.");
      } catch (error) {
        console.error("Error clearing IndexedDB: ", error);
      }
    };

    const intervalId = setInterval(
      clearDatabaseEvery2Weeks,
      14 * 24 * 60 * 60 * 1000
    ); // 7 days in milliseconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [submissions, setSubmissions] = useState([]); // Store all submissions

  // State for displaying the success and error message
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    openDatabase()
      .then((db) => {
        getAllSubmissions(db).then((data) => setSubmissions(data));
      })
      .catch((error) => console.error("Error opening database: ", error));
  }, []);

  const resetForm = () => {
    setFormData({
      streckennummer: "",
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
            streckennummer: formData.streckennummer,
            km: formData.km,
            met: formData.met,
            seite: formData.seite,
            sonstiges: formData.sonstiges,
            punktnummer: formData.punktnummer,
            gvp: formData.gvp,
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

  return (
    <div className={classnames(classes.root, "appWrapper")}>
      <Paper elevation={3} classes={classes.paper}>
        <Box>
          <Typography style={{ padding: 16 }} variant="h4">
            Die GV-Targeterfassung
          </Typography>
        </Box>
        <MainForm
          reff={reff}
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhotoChange={handlePhotoChange}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <Buttons
          handleSubmit={handleSubmit}
          downloadCombinedData={downloadCombinedData}
          downloadCombinedTodayData={downloadCombinedTodayData}
        />
      </Paper>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <SnackbarContent
          message={successMessage}
          style={{ backgroundColor: "#92b493" }}
        />
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <SnackbarContent
          message={errorMessage}
          style={{ backgroundColor: "#FF5722" }}
        />
      </Snackbar>
    </div>
  );
}

export default App;
