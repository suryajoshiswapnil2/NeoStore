import SQLite from "react-native-sqlite-storage";

let db = null;

export const callback = {
  errorCB: err => {
    console.log("error: ", err);
    return false;
  },
  successCB: () => {
    console.log("SQL executed ...");
  },
  openCB: () => {
    console.log("Database OPEN");
  },
  closeCB: () => {
    console.log("Database CLOSED");
  },
  deleteCB: () => {
    console.log("Database DELETED");
  }
};

const sqlQuery = query => {
  if (db == null) return;
  db.transaction(tx => {
    tx.executeSql(
      query,
      [],
      (tx, results) => {
        console.log("Query completed");
      },
      err => {
        console.log(err);
      }
    );
  });
};

export var databaseService = {
  openDatabase: () => {
    db = SQLite.openDatabase(
      {
        name: "neostore.db",
        location: "default"
      },
      () => console.log("Success"),
      e => console.log(e)
    );
  },
  addAddress: obj => {
    console.log(obj);
    let query = `INSERT INTO Address
     (name, addr, landmark, city, state, zip_code, country) 
    VALUES (
        '${obj.name}', 
        '${obj.addr}',
        '${obj.landmark}',
        '${obj.city}',
        '${obj.state}',
        '${obj.zip_code}',
        '${obj.country}',
    );`;
    console.log(query);
    sqlQuery(query);
  },
  updateAddress: obj => {
    console.log(obj);
  },
  removeAddress: id => {
    console.log(id);
  },
  createAddressTable: () => {
    let query = `CREATE TABLE IF NOT EXISTS Address (
        id integer PRIMARY KEY,
        name text NOT NULL,
        addr text NOT NULL,
        landmark text,
        city text NOT NULL,
        state text NOT NULL,
        zip_code text NOT NULL,
        country text NOT NULL);`;
    sqlQuery(query);
  },
  closeDatabase: () => {
    if (db) {
      console.log("Closing database..");
      db.close(callback.closeCB, callback.errorCB);
    } else {
      console.log("Database was not opened");
    }
  }
};
