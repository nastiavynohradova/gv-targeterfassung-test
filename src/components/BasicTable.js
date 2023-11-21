import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MainFormDialogContainer from "./MainFormDialogContainer";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#6a8dbb",
    color: theme.palette.common.white,
  },
  editButton: {
    color: theme.palette.secondary.main,
  },
}));

export default function EnhancedTable({
  importData,
  reff,
  setImportData
}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="enhanced table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell align="right">Datum</TableCell>
            <TableCell align="right">Kilometrierung</TableCell>
            <TableCell align="right">Punktnummer</TableCell>
            <TableCell align="right">Seite</TableCell>
            <TableCell align="right">Streckennummer</TableCell>
            <TableCell align="right">GVP Länge</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {row.Datum}
              </TableCell>
              <TableCell align="right">{row.Kilometrierungwert
}</TableCell>
              <TableCell align="right">{row.Punktnummer}</TableCell>
              <TableCell align="right">{row.Seite}</TableCell>
              <TableCell align="right">{row.Streckennummer}</TableCell>
              <TableCell align="right">{row["GVP L�nge (m)"]}</TableCell>
              <TableCell align="right">
                <MainFormDialogContainer
                  row={row}
                  reff={reff}
                  setImportData={setImportData}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
