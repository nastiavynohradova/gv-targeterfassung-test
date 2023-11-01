import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: "10px 20px",
    fontSize: "1rem",
    textTransform: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const Buttons = ({
  handleSubmit,
  downloadCombinedTodayData,
  downloadCombinedData,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={handleSubmit}
      >
        Abschicken
      </Button>
      <br />
      <br />
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudDownloadIcon />}
          onClick={() => downloadCombinedTodayData()}
        >
          Daten von heute herunterladen
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudDownloadIcon />}
          onClick={() => downloadCombinedData()}
        >
          Alle Daten herunterladen
        </Button>
      </Box>
    </Box>
  );
};

export default Buttons;
