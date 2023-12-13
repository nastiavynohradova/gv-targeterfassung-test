import React, { useState } from "react";
import Papa from "papaparse";
import { Box, Button, Input, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CloudUpload, OpenInBrowser } from "@material-ui/icons";
import { SimpleDialog } from "./Formular";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const handleCSVFile = (file, setImportData, setColNames) => {
  Papa.parse(file, {
    complete: (result) => {
      const name = file.name ? file.name.split(".").at(0) : "";
      setImportData([
        ...result.data.map((el, idx) => ({
          ...el,
          id: idx,
          Streckennummer: name,
          "GVP Länge": "",
        })),
      ]);
      setColNames([...result.meta.fields, "Streckennummer", "GVP Länge"]);
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
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = (value) => {
    setFormOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleCSVFile(file, setImportData, setColNames);
      setShowTable(true);
      setShowDownloadButton(true);
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
            Formular öffnen
          </Button>
          <SimpleDialog
            selectedValue={""}
            open={formOpen}
            onClose={handleClose}
          />
        </Box>
        {showDownloadButton && ( // Conditionally render the download button
          <Paper className={classes.content} elevation={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CloudDownloadIcon />}
            >
              Tabelle herunterladen
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default CSVimport;
