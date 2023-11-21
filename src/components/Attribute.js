import { TextField, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    title: {
      fontWeight: "bold",
      fontSize: "1.2rem", // Adjust the font size
      marginBottom: "5px", // Add some spacing below titles
    },
  }));

const Attribute = ({value, setValue, name}) => {
    const classes = useStyles(); 
    return <>
        <Typography variant="h5" className={classes.title}>
          {name}
        </Typography>
        <TextField
          required
          fullWidth
          name={name}
/*           type={name === "km" ? "text" : "number"} */
type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          margin="normal"
          onInput={(e) => {
            if(name === "Streckennummer") {
                e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 4);
            }
          }}
        />
        <br></br>
    </>
};

export default Attribute;