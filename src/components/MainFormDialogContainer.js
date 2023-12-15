import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "./Buttons";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import MainForm from "./MainForm";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  successSnackbar: {
    backgroundColor: "#92b493",
  },
  errorSnackbar: {
    backgroundColor: "#FF5722",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    padding: "10px 20px",
    fontSize: "1rem",
    textTransform: "none",
  },
}));

function SimpleDialog({
  row,
  onClose,
  selectedValue,
  open,
  reff,
  setImportData,
}) {
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Paper elevation={3} className={classes.paper}>
        <MainForm row={row} reff={reff} setImportData={setImportData} />
      </Paper>
    </Dialog>
  );
}

const MainFormDialogContainer = ({
  row,
  reff,
  selectedRowData,
  setImportData,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(selectedRowData);
  };

  return (
    <>
      <div className={classes.buttonContainer}>
        <IconButton
          aria-label="edit"
          onClick={() => handleClickOpen()}
          className={classes.button}
        >
          Bearbeiten
          <EditIcon />
        </IconButton>
        <SimpleDialog
          row={row}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          reff={reff}
          selectedRowData={selectedRowData}
          setImportData={setImportData}
        />
      </div>
    </>
  );
};

export default MainFormDialogContainer;
