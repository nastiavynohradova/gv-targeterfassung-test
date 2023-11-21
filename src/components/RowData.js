import React, { useState } from "react";
import MainFormDialogContainer from "./MainFormDialogContainer";
import MainForm from "./MainForm";

function RowData() {
  const [row, setRow] = useState(row);
  console.log(row);
  const handleRowChange = (newRow) => {
    setRow(newRow);
  };

  return (
    <>
      <MainForm row={row} handleRowChange={handleRowChange} />
      <MainFormDialogContainer row={row} handleRowChange={handleRowChange} />
    </>
  );
}

export default RowData;
