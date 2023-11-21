import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { openDatabase } from "./db";
import CSVimport from "./components/CSVimport";
import BasicTable from "./components/BasicTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    "& > *": {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

// Function to clear the IndexedDB
const clearIndexedDB = async (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["submissions"], "readwrite");
    const objectStore = transaction.objectStore("submissions");

    const request = objectStore.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const App = () => {
  const classes = useStyles();

  const reff = useRef(null);

  const [importData, setImportData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const clearDatabaseEvery2Weeks = async () => {
      try {
        const db = await openDatabase();
        await clearIndexedDB(db);
        console.log("IndexedDB cleared.");
      } catch (error) {
        console.error("Error clearing IndexedDB: ", error);
      }
    };

    // Calculate the time until the next midnight
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = nextMidnight - now;

    // Schedule the first interval to start at the next midnight and repeat every 14 days at midnight
    const interval = 14 * 24 * 60 * 60 * 1000 + timeUntilMidnight;
    const intervalId = setInterval(clearDatabaseEvery2Weeks, interval);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);



  return (
    <div className={classnames(classes.root, "appWrapper")}>
      <CSVimport setShowTable={setShowTable} setImportData={setImportData} />
      {showTable && (
        <BasicTable
          importData={importData}
          reff={reff}
          
        />
      )}
    </div>
  );
}

export default App;
