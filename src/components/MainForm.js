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
import React, { useEffect, useState, useRef } from "react";
import Buttons from "./Buttons";
import JSZip from "jszip";
import {
  openDatabase,
  addSubmission,
  deleteSubmission,
  getAllSubmissions,
} from "../db";
import Attribute from "./Attribute";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import imageCompression from "browser-image-compression";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem", // Adjust the font size
    marginBottom: "5px", // Add some spacing below titles
  },
  textField: {
    marginBottom: "1px", // Add margin to text fields
  },
  successSnackbar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  errorSnackbar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const MainForm = ({ reff, row, setImportData }) => {
  const [formData, setFormData] = useState({
    seite: false,
    sonstiges: "",
    gvp: "",
    photo: null,
  });

  const [punktnummer, setPunktnummer] = useState(row.PktNr ? row.PktNr : "");
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
  const [selectedStatus, setselectedStatus] = useState(null);
  const [sonstiges2, setSonstiges2] = useState("");
  const [gvp, setGVP] = useState("");
  const [photo, setPhoto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState([]); // Store all submissions

  //const webcamRef = useRef(null);

  useEffect(() => {
    setImportData((state) =>
      state.map((el) => {
        if (el.id === row.id) {
          return {
            ...el,
            "Offset [mm]": gvp,
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

  //const capture = () => {
  //  const imageSrc = webcamRef.current.getScreenshot();
  //  setPhoto(imageSrc);
  //};

  //const videoConstraints = {
  //  width: 440,
  //  height: 280,
  //  facingMode: { exact: "environment" },
  //};

  // State for displaying the success and error message
  const [successOpen, setSuccessOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
    if (row) {
      if (row["Km-Station Ist"]) {
        const [kmValue, meterValue] = row["Km-Station Ist"].split(",");
        const km = kmValue.slice(0, -3);
        const meters = parseFloat(kmValue.slice(-3));
        setKm(km);
        setMet(meters);
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

  const statusOptions = [
    { value: 1, label: "Zerstört" },
    { value: 2, label: "Vorhanden mit Target" },
    { value: 3, label: "Vorhanden ohne Target" },
  ];

  const handleChangeVermarkung = (event) => {
    setselectedVermarkungstrager(event.target.value);
    if (event.target.value) {
      setMastnummer(""); // Reset Mastnummer when Vermarkungstrager is selected
    }
  };

  const handleChangeStatus = (event) => {
    setselectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    // Check if a photo is selected
    if (!photo) {
      setErrorMessage("Bitte wählen Sie ein Foto aus, bevor Sie fortfahren.");
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    // Check if streckennummer is empty
    if (!streckennummer) {
      setErrorMessage(
        "Bitte geben Sie die Streckennummer ein, bevor Sie fortfahren."
      );
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    if (!km & !met) {
      setErrorMessage(
        "Bitte geben Sie die Kilometrierung ein, bevor Sie fortfahren."
      );
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    if (!seite) {
      setErrorMessage("Bitte wählen Sie eine Seite aus, bevor Sie fortfahren.");
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    if (!mastnummer) {
      setErrorMessage(
        "Bitte geben Sie eine Mastnummer ein, bevor Sie fortfahren."
      );
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    if (!selectedStatus) {
      setErrorMessage(
        "Bitte wählen Sie einen Status aus, bevor Sie fortfahren."
      );
      setSuccessMessage(""); // Clear any existing success message
      return;
    }
    // Reset the form after a successful submission
    resetForm();

    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64Photo = event.target.result;
      const maxSizeInBytes = 0.5 * 1024 * 1024; // 0.5 MB
      let quality = 1;

      // Create an Image object and set its source to the base64 representation of the photo
      const image = new Image();
      image.src = base64Photo;

      image.onload = async () => {
        // Check if the photo size is smaller than or equal to 0.5 MB
        if (event.total <= maxSizeInBytes) {
          // Do nothing, the photo is already within the size limit
          const vermarkungLabel = selectedVermarkungstrager
            ? vermarkungOptions.find(
                (option) => option.value === selectedVermarkungstrager
              )?.label
            : "";

          const statusLabel = selectedStatus
            ? statusOptions.find((option) => option.value === selectedStatus)
                ?.label
            : "";

          const newSubmission = {
            punktnummer: punktnummer,
            streckennummer: streckennummer,
            km: km,
            met: met,
            seite: seite,
            sonstiges: sonstiges,
            mastnummer: mastnummer,
            selectedVermarkungstrager: vermarkungLabel,
            selectedStatus: statusLabel,
            sonstiges2: sonstiges2,
            gvp: gvp,
            currentDate: currentDate,
            photo: base64Photo,
          };

          // Save the new submission to IndexedDB
          try {
            const db = await openDatabase();
            //await addSubmission(db, newSubmission);
            let data = await getAllSubmissions(db);
            // Check if there's an existing submission with the same Streckennummer, Punktnummer, Kilometrierung
            const index = data.findIndex(
              (submission) =>
                submission.streckennummer === newSubmission.streckennummer &&
                submission.km === newSubmission.km &&
                submission.punktnummer === newSubmission.punktnummer &&
                submission.met === newSubmission.met
            );
            console.log(index);
            if (index !== -1) {
              // If a matching submission is found, replace it with the new submission
              await deleteSubmission(db, data[index].id);
            }
            // Add the new submission
            await addSubmission(db, newSubmission);
            setSubmissions(data);

            setSuccessMessage("Erfolgreich hinzugefügt");
            setSuccessOpen(true);
          } catch (error) {
            console.error("Error adding or fetching submission: ", error);
          }
        } else {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = image.width;
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0, image.width, image.height);

          try {
            const compressedPhotoBlob = await new Promise((resolve) => {
              canvas.toBlob(resolve, "image/jpeg", quality);
            });

            const compressedPhoto = await imageCompression(
              compressedPhotoBlob,
              {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
              }
            );
            console.log(
              "compressedFile instanceof Blob",
              compressedPhoto instanceof Blob
            ); // true
            console.log(
              `compressedFile size ${compressedPhoto.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB

            const vermarkungLabel = selectedVermarkungstrager
              ? vermarkungOptions.find(
                  (option) => option.value === selectedVermarkungstrager
                )?.label
              : "";

            const statusLabel = selectedStatus
              ? statusOptions.find((option) => option.value === selectedStatus)
                  ?.label
              : "";

            const newSubmission = {
              punktnummer: punktnummer,
              streckennummer: streckennummer,
              km: km,
              met: met,
              seite: seite,
              sonstiges: sonstiges,
              mastnummer: mastnummer,
              selectedVermarkungstrager: vermarkungLabel,
              selectedStatus: statusLabel,
              sonstiges2: sonstiges2,
              gvp: gvp,
              currentDate: currentDate,
              photo: compressedPhoto,
            };

            // Save the new submission to IndexedDB
            try {
              const db = await openDatabase();
              //await addSubmission(db, newSubmission);
              let data = await getAllSubmissions(db);
              // Check if there's an existing submission with the same Streckennummer, Punktnummer, Kilometrierung
              const index = data.findIndex(
                (submission) =>
                  submission.streckennummer === newSubmission.streckennummer &&
                  submission.km === newSubmission.km &&
                  submission.punktnummer === newSubmission.punktnummer &&
                  submission.met === newSubmission.met
              );
              console.log(index);
              if (index !== -1) {
                // If a matching submission is found, replace it with the new submission
                await deleteSubmission(db, data[index].id);
              }
              // Add the new submission
              await addSubmission(db, newSubmission);
              setSubmissions(data);

              setSuccessMessage("Erfolgreich hinzugefügt");
              setSuccessOpen(true);
            } catch (error) {
              console.error("Error adding or fetching submission: ", error);
            }
          } catch (error) {
            /* else {
              console.error("Compressed photo size is still too large.");
              setErrorMessage(
                "Die komprimierte Foto-Größe ist immer noch zu groß, um eine vernünftige Qualität beizubehalten. Bitte wählen Sie eine kleinere Dateigröße oder optimieren Sie das Bild, bevor Sie es hochladen."
              );
              setSuccessMessage(""); // Clear any existing success message
            } */
            console.error("Error compressing photo: ", error);
          }
        }
      };
    };

    // Read the photo data as a data URL
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
      "Punktnummer;Streckennummer;Kilometrierung; Seite (bezogen auf Strecke); Sonstiges; Mastnummer; Status; Vermarkung; Sonstiges Vermarkung; Offset [m]; Datum\n" +
      todaySubmissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.punktnummer};${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.mastnummer};${entry.selectedStatus};${entry.selectedVermarkungstrager};${entry.sonstiges2};${gvpInMeters};${currentDate}`;
        })
        .join("\n");

    zip.file(`${currentDate}.csv`, csvContent);

    // Create two folders directly in the ZIP file
    const vorhandenMitTargetFolder = zip.folder("Vorhanden_mit_Target");
    const vorhandenOhneTargetFolder = zip.folder("Vorhanden_ohne_Target");

    // Add the image files to the ZIP file
    todaySubmissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      let roundedMetWithoutLastDigit;
      if (el.met && el.met.toString().length >= 3) {
        const metAsNumber = parseFloat(el.met);
        const roundedMet = Math.round(metAsNumber / 10) * 10;
        roundedMetWithoutLastDigit = Math.floor(roundedMet / 10);
      } else {
        roundedMetWithoutLastDigit = el.met; // No rounding if met has 1 or 2 digits
      }

      let folderToAdd;
      if (el.selectedStatus === "Vorhanden ohne Target") {
        folderToAdd = vorhandenOhneTargetFolder;
      } else {
        folderToAdd = vorhandenMitTargetFolder;
      }

      let filename;

      if (el.mastnummer && el.mastnummer.endsWith("N")) {
        let mastnummer = el.mastnummer;
        mastnummer = mastnummer.trim().slice(0, -1);
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${mastnummer}_${date}.jpg`;
      } else if (
        el.selectedVermarkungstrager &&
        el.selectedVermarkungstrager !== "Sonstiges"
      ) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.selectedVermarkungstrager}_${date}.jpg`;
      } else if (el.sonstiges2) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.sonstiges2}_${date}.jpg`;
      } else if (el.mastnummer) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.mastnummer}_${date}.jpg`;
      } else {
        // Handle the case when none of the conditions are met
        console.error("Invalid submission data");
        return;
      }

      if (el.photo instanceof Blob) {
        // Assuming el.photo is a Blob
        folderToAdd.file(filename, el.photo);
      } else if (typeof el.photo === "string") {
        // Assuming el.photo is a base64 encoded string
        const base64Data = el.photo.split(",")[1];
        folderToAdd.file(filename, base64Data, { base64: true });
      }
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
      "Punktnummer;Streckennummer;Kilometrierung; Seite (bezogen auf Strecke); Sonstiges; Mastnummer; Status; Vermarkung; Sonstiges Vermarkung; Offset [m]; Datum\n" +
      submissions
        .map((entry) => {
          const gvpInMeters = (entry.gvp / 1000).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          });
          return `${entry.punktnummer};${entry.streckennummer};${entry.km},${entry.met};${entry.seite};${entry.sonstiges};${entry.mastnummer};${entry.selectedStatus};${entry.selectedVermarkungstrager};${entry.sonstiges2};${gvpInMeters};${entry.currentDate}`;
        })
        .join("\n");

    zip.file("alle_daten.csv", csvContent);

    // Create two folders directly in the ZIP file
    const vorhandenMitTargetFolder = zip.folder("Vorhanden_mit_Target");
    const vorhandenOhneTargetFolder = zip.folder("Vorhanden_ohne_Target");

    // Add the image files to the ZIP file
    submissions.forEach((el, index) => {
      const date = el.currentDate.replace(/-/g, "");
      let roundedMetWithoutLastDigit;
      if (el.met && el.met.toString().length >= 3) {
        const metAsNumber = parseFloat(el.met);
        const roundedMet = Math.round(metAsNumber / 10) * 10;
        roundedMetWithoutLastDigit = Math.floor(roundedMet / 10);
      } else {
        roundedMetWithoutLastDigit = el.met; // No rounding if met has 1 or 2 digits
      }

      let folderToAdd;
      if (el.selectedStatus === "Vorhanden ohne Target") {
        folderToAdd = vorhandenMitTargetFolder;
      } else if (el.selectedStatus === "Vorhanden ohne Target") {
        folderToAdd = vorhandenOhneTargetFolder;
      }

      let filename;

      if (el.mastnummer) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.mastnummer}_${date}.jpg`;
      } else if (
        el.selectedVermarkungstrager &&
        el.selectedVermarkungstrager !== "Sonstiges"
      ) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.selectedVermarkungstrager}_${date}.jpg`;
      } else if (el.sonstiges2) {
        filename = `${el.streckennummer}_${el.km},${roundedMetWithoutLastDigit}_${el.seite}_${el.sonstiges2}_${date}.jpg`;
      } else {
        // Handle the case when none of the conditions are met
        console.error("Invalid submission data");
        return;
      }
      if (el.photo instanceof Blob) {
        // Assuming el.photo is a Blob
        folderToAdd.file(filename, el.photo);
      } else if (typeof el.photo === "string") {
        // Assuming el.photo is a base64 encoded string
        const base64Data = el.photo.split(",")[1];
        folderToAdd.file(filename, base64Data, { base64: true });
      }
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
          value={punktnummer}
          setValue={setPunktnummer}
          name="Punktnummer"
        />
        <Attribute
          value={streckennummer}
          setValue={setStreckennummer}
          name="Streckennummer"
        />
        {/* <Attribute value={km} setValue={setKm} name="Km" /> */}
        <Typography variant="h6" className={classes.title}>
          Kilometrierung [km]
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <TextField
            required
            style={{ marginRight: "5px" }}
            id="km"
            name="km"
            placeholder="z.B. 69"
            value={km}
            onChange={handleInputChange}
            inputProps={{ style: { textAlign: "center" }, maxLength: 2 }}
          />
          <Typography>, </Typography>
          <TextField
            required
            style={{ marginLeft: "5px" }}
            id="met"
            name="met"
            placeholder="875"
            value={met}
            onChange={handleInputChange}
            inputProps={{ style: { textAlign: "center" }, maxLength: 3 }}
          />
        </Box>
        <br></br>
        <Typography variant="h6" className={classes.title}>
          Seite (bezogen auf Strecke)
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
          Status
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="status"
            id="status"
            value={selectedStatus}
            label="Status"
            onChange={(event) => handleChangeStatus(event)}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            onChange={(event) => handleChangeVermarkung(event)}
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
        <Attribute
          value={gvp}
          setValue={(value) => {
            if (selectedStatus === 3) {
              setGVP(""); // Clear the value if selectedStatus is 3
            } else {
              setGVP(value); // Otherwise, set the value normally
            }
          }}
          name="Offset [mm]"
          disabled={selectedStatus === 3}
        />
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

        {/*  <Webcam
          audio={false}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        /> */}

        {/*  <button onClick={capture}>Foto aufnehmen</button> */}
        {/* {photo && <img src={photo} alt="Captured" />} */}
        <input
          ref={(el) => (reff.current = el)}
          required
          type="file"
          name="photo"
          accept="image/*;capture=camera"
          onChange={(e) => handlePhotoChange(e)}
        />
      </Box>
      <Buttons
        handleSubmit={handleSubmit}
        downloadCombinedData={downloadCombinedData}
        downloadCombinedTodayData={downloadCombinedTodayData}
      />
      <Snackbar
        open={!!successMessage}
        autoHideDuration={7000}
        onClose={handleSuccessClose}
      >
        <SnackbarContent
          message={successMessage}
          className={classes.successSnackbar}
        />
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={12000}
        onClose={handleErrorClose}
      >
        <SnackbarContent
          message={errorMessage}
          className={classes.errorSnackbar}
        />
      </Snackbar>
    </>
  );
};

export default MainForm;
