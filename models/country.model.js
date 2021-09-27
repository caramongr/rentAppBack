const sql = require("./db.js");

// constructor
const Country = function(country) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=country.title;
  this.description=country.description;
  this.photo=country.photo;
  this.priority=country.priority;
  this.metakey=country.metakey;
  this.metadesc=country.metadesc;
};

Country.create = (newCountry, result) => {
  sql.query("INSERT INTO countries SET ?", newCountry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created country: ", { id: res.id, ...newCountry });
    result(null, { id: res.insertId, ...newCountry });
  });
};

Country.findById = (countryId, result) => {
  sql.query(`SELECT * FROM countries WHERE id = ${countryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found country: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Country with the id
    result({ kind: "not_found" }, null);
  });
};

Country.getAll = result => {
  sql.query("SELECT * FROM countries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("countries: ", res);
    result(null, res);
  });
};

Country.updateById = (id, country, result) => {
  sql.query(
    "UPDATE countries SET title = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ? WHERE id = ?",
    [country.title, country.description, country.photo, country.priority, country.metakey, country.metadesc, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated  country: ", { id: id, ...country});
      result(null, { id: id, ...country });
    }
  );
};

Country.remove = (id, result) => {
  sql.query("DELETE FROM countries WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Country with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted country with id: ", id);
    result(null, res);
  });
};

Country.removeAll = result => {
  sql.query("DELETE FROM countries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} countries`);
    result(null, res);
  });
};

module.exports = Country;
