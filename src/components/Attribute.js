import { TextField, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "5px",
  },
}));

const Attribute = ({ value, setValue, name, disabled }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // If the attribute is "Streckennummer", ensure it is a positive integer
    if (name === "Streckennummer") {
      newValue = Math.max(0, parseInt(newValue, 10)).toString().slice(0, 4);
    }

    // Update the state in the parent component
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        {name}
      </Typography>
      <TextField
        required
        disabled={disabled}
        fullWidth
        name={name}
        value={value}
        onChange={handleInputChange}
        margin="normal"
        inputProps={{ style: { textAlign: "center" } }}
      />
      <br />
    </>
  );
};

export default Attribute;
