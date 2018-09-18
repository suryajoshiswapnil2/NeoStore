import SQLite from "react-native-sqlite-storage";

let db = null;
let rows = [];

export const getRowsFromResult = results => {
  rows = [];
  if (results.rows.length == 0) return rows;

  var len = results.rows.length;
  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    rows.push(row);
  }
  return rows;
};

const sqlQuery = (query, callback, errCallback) => {
  if (db == null) {
    databaseService.openDatabase();
  }

  db.transaction(tx => {
    tx.executeSql(
      query,
      [],
      (tx, results) => {
        return callback !== undefined
          ? callback(results)
          : console.log("SQLite >> ", query, getRowsFromResult(results));
      },
      err => {
        if (errCallback == undefined) console.log("SQLite >> ", err);
        else errCallback(err);
      }
    );
  });
};

export var databaseService = {
  openDatabase: (success, error) => {
    db = SQLite.openDatabase(
      {
        name: "neostore.db",
        location: "default"
      },
      () => console.log("SQLite >> ", "Database Opened Successfully!"),
      e => console.log("SQLite >> ", e)
    );
  },

  addAddress: (obj, success, error) => {
    // databaseService.openDatabase();

    // databaseService.createAddressTable();

    let query = `INSERT INTO Address
     (name, addr, landmark, city, state, zip_code, country) 
    VALUES ('${obj.name}', '${obj.addr}' , '${obj.landmark}' , '${
      obj.city
    }' , '${obj.state}', '${obj.zip_code}' ,'${obj.country}');`;
    sqlQuery(query);
  },

  updateAddress: (obj, success, error) => {
    let query = `UPDATE Address SET 
        name = '${obj.name}', 
        addr = '${obj.addr}',  
        landmark = '${obj.landmark}', 
        city = '${obj.city}',
        state = '${obj.state}',
        zip_code = '${obj.zip_code}',
        country = '${obj.country}' 
    WHERE id = '${obj.id}'`;
    sqlQuery(query);
  },

  removeAddress: (id, success, error) => {
    let query = `DELETE FROM Address WHERE id = ${id};`;
    sqlQuery(query);
  },

  createAddressTable: (success, error) => {
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

  closeDatabase: (success, error) => {
    if (db) {
      db.close(
        () => console.log("SQLite >> ", "Database closed!"),
        err => console.log("SQLite >> ", err)
      );
    } else {
      console.log("SQLite >> ", "Database was not opened");
    }
  },

  select: (table_name, success, error) => {
    // databaseService.openDatabase();

    // databaseService.createAddressTable();

    let query = `SELECT * from ${table_name};`;

    if (success == undefined) sqlQuery(query);
    else sqlQuery(query, success);
  },

  getRows: () => {
    return rows;
  }
};
