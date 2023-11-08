import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  makeStyles, // Import makeStyles
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";

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

const MainForm = ({
  formData,
  handleInputChange,
  handlePhotoChange,
  currentDate,
  setCurrentDate,
  reff,
}) => {
  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
  }, []);

  const classes = useStyles(); // Initialize the useStyles
  return (
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
      <Typography variant="h5" className={classes.title}>
        Streckennummer
      </Typography>
      <TextField
        required
        fullWidth
        name="streckennummer"
        type="number"
        value={formData.streckennummer}
        onChange={handleInputChange}
        margin="normal"
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 4);
        }}
      />
      <br></br>
      <Typography variant="h6" className={classes.title}>
        Kilometrierung
      </Typography>

      <Box display="flex" flexDirection="row" alignItems="center">
        <TextField
          required
          style={{ marginRight: "5px" }}
          id="km"
          name="km"
          type="number"
          placeholder="z.B. 145"
          value={formData.km}
          onChange={handleInputChange}
        />
        <Typography>, </Typography>
        <TextField
          required
          style={{ marginLeft: "5px" }}
          id="met"
          name="met"
          type="number"
          placeholder="02"
          value={formData.met}
          onChange={handleInputChange}
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
            value={formData.seite}
            onChange={handleInputChange}
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
          value={formData.sonstiges}
          onChange={formData.handleChange}
        />
      </Box>
      <br></br>
      <Typography variant="h6" className={classes.title}>
        Punktnummer
      </Typography>

      <TextField
        required
        fullWidth
        name="punktnummer"
        value={formData.punktnummer}
        onChange={handleInputChange}
        margin="normal"
      />
      <br></br>
      <Typography variant="h6" className={classes.title}>
        GVP Länge, mm
      </Typography>

      <TextField
        required
        fullWidth
        name="gvp"
        value={formData.gvp}
        onChange={handleInputChange}
        margin="normal"
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
  );
};

export default MainForm;
