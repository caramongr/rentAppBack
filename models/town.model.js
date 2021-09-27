const sql = require("./db.js");

// constructor
const Town = function(town) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=town.title;
  this.description=town.description;
  this.photo=town.photo;
  this.priority=town.priority;
  this.metakey=town.metakey;
  this.metadesc=town.metadesc;
  this.stateid=town.stateid;
};

Town.create = (newTown, result) => {
  sql.query("INSERT INTO towns SET ?", newTown, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created town: ", { id: res.id, ...newTown});
    result(null, { id: res.Id, ...newTown });
  });
};

Town.findById = (townId, result) => {
  sql.query(`SELECT * FROM towns WHERE id = ${townId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found town: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Town with the id
    result({ kind: "not_found" }, null);
  });
};

Town.getAll = result => {
  sql.query("SELECT * FROM towns", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("towns: ", res);
    result(null, res);
  });
};

Town.updateById = (id, town, result) => {
  sql.query(
    "UPDATE towns SET title = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ? , stateid = ? WHERE id = ?",
    [town.title, town.description, town.photo, town.priority, town.metakey, town.metadesc, town.stateid, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Town with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated  town: ", { id: id, ...town});
      result(null, { id: id, ...town });
    }
  );
};

Town.remove = (id, result) => {
  sql.query("DELETE FROM towns WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Town with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted town with id: ", id);
    result(null, res);
  });
};

Town.removeAll = result => {
  sql.query("DELETE FROM towns", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} towns`);
    result(null, res);
  });
};

module.exports = Town;
