import React, { useState } from "react";
import Papa from "papaparse";
import { Box, Button, Input, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const handleCSVFile = (file, setImportData) => {
  Papa.parse(file, {
    complete: (result) => {
      setImportData(result.data);
    },
    header: true,
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
  button: {
    marginTop: theme.spacing(2),
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

const CSVimport = ({ setShowTable, setImportData }) => {
  const classes = useStyles();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleCSVFile(file, setImportData);
      setShowTable(true);
    }
  };

  return (
    <Box>
      <Paper className={classes.header} elevation={3}>
        <Typography variant="h4">Die GV-Targeterfassung</Typography>
      </Paper>
      <Paper className={classes.content} elevation={3}>
        <Box>
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
              startIcon={<CloudUploadIcon />}
              color="secondary"
              className={classes.button}
              component="span"
            >
              Koordinatendatei hochladen
            </Button>
          </label>
        </Box>
      </Paper>
    </Box>
  );
};

export default CSVimport;
