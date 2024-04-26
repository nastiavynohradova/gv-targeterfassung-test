import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Box, Button, Input, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CloudUpload, OpenInBrowser } from "@material-ui/icons";
import { SimpleDialog } from "./Formular";

const handleCSVFile = (file, setImportData, setColNames) => {
  Papa.parse(file, {
    complete: (result) => {
      const name = file.name ? file.name.split(".").at(0) : "";

      // Check if there are data rows in the result
      if (result.data && result.data.length > 0) {
        const headerRow = Object.keys(result.data[0]);

        // Exclude the last row if it is empty
        const dataRows = result.data.slice(0, -1);

        // Define the columns you want to include
        const columnsToInclude = ["PktNr", "Km-Station Ist"];

        // Filter out only the columns you are interested in
        const filteredDataRows = dataRows.map((el, idx) => {
          const filteredRow = {
            id: idx,
            Streckennummer: name,
            "Offset [mm]": "",
          };

          columnsToInclude.forEach((col) => {
            if (col === "Km-Station Ist") {
              // Round the value to 3 digits after the decimal point
              const kmStationValue = el[col].toString();
              const integerPart = kmStationValue
                .split(",")[0]
                .replace(/\D/g, "");
              const formattedValue = integerPart.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
              filteredRow[col] = formattedValue;
            } else {
              filteredRow[col] = el[col];
            }
          });

          return filteredRow;
        });

        setImportData(filteredDataRows);

        // Set the column names
        setColNames([...columnsToInclude, "Streckennummer", "Offset [mm]"]);
      } else {
        console.error("CSV file is empty or missing data.");
        // Handle the case when the CSV file is empty or missing data
      }
    },
    header: true,
    encoding: "ISO-8859-1",
  });
};

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  content: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center", // Center-align the buttons
  },
  button: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    fontSize: "1rem",
    textTransform: "none",
    backgroundColor: "#6a8dbb",
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#3c5a7d",
    },
  },
  input: {
    display: "none",
  },
}));

const CSVimport = ({ setShowTable, setImportData, setColNames }) => {
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = (value) => {
    setFormOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check if the selected file is a CSV file
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        handleCSVFile(file, setImportData, setColNames);
        setShowTable(true);
        setFileSelected(true);
        setInvalidFileType(false); // Reset the invalid file type state
      } else {
        // Set the state to indicate an invalid file type
        setInvalidFileType(true);
        setFileSelected(false);
      }
    } else {
      setFileSelected(false);
      setInvalidFileType(false); // Reset the invalid file type state
    }
  };

  return (
    <Box>
      <Paper className={classes.header} elevation={3}>
        <Typography variant="h4">GV-Targeterfassung</Typography>
      </Paper>
      <Paper className={classes.content} elevation={3}>
        <Box className={classes.buttonContainer}>
          <label htmlFor="csv-input">
            <Input
              accept=".csv"
              className={classes.input}
              id="csv-input"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              color="secondary"
              className={classes.button}
              component="span"
            >
              Koordinatendatei hochladen
            </Button>
          </label>
          {invalidFileType && (
            <Typography variant="body2" color="error">
              Wählen Sie eine CSV Datei
            </Typography>
          )}
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<OpenInBrowser />}
            color="secondary"
            className={classes.button}
            component="span"
            onClick={handleClickOpen}
          >
            Neupunkt erfassen
          </Button>
          <SimpleDialog
            selectedValue={""}
            open={formOpen}
            onClose={handleClose}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CSVimport;
