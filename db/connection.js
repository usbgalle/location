var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "temdb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  let DbServices = {};

  DbServices.addValues = (value1, value2, value3) => {
    return new Promise((resolve, reject) => {
        // check whether is an exisiting game url
        con.query('INSERT INTO location_data(unit_id, lat,lon) VALUES (?,?,?)', [value1, value2, value3], (err, results, fields) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve({ success: true, message: 'updated' });
        });

    });
}
DbServices.getValues = () => {
  return new Promise((resolve, reject) => {
      // check whether is an exisiting game url
      con.query('SELECT * FROM location_data', (err, results, fields) => {
          if (err) {
              console.log(err);
              return reject(err);
          }
          return resolve({ success: true, message: results });
      });

  });
}

module.exports = DbServices;