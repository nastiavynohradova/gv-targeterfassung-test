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

const TableWrapper = ({
  importData,
  reff,
  setImportData,
  colNames
}) => {
  console.log(colNames)
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="enhanced table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            {colNames.map((col,idx) => (
              <TableCell key={`keys-${idx}`} align="right">{col}</TableCell>
            ))}
            <TableCell key={`keys-edit`} align="right">GVP Länge</TableCell>
            <TableCell key={`keys-edit`} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importData.map((row, idx) => (
            <TableRow key={idx}>
              {colNames.map((col, idx) => (
              <TableCell key={`values-${idx}`} align="right">{row[col]}</TableCell>
            ))}
              <TableCell key={`keys-edit`} align="right"></TableCell>
              <TableCell key={`values-edit`} align="right">
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
};

export default TableWrapper;
