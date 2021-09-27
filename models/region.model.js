const sql = require("./db.js");

// constructor
const Region = function(region) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=region.title;
  this.description=region.description;
  this.photo=region.photo;
  this.priority=region.priority;
  this.metakey=region.metakey;
  this.metadesc=region.metadesc;
  this.townid=region.townid;
};

Region.create = (newRegion, result) => {
  sql.query("INSERT INTO regions SET ?", newRegion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created region: ", { id: res.id, ...newRegion});
    result(null, { id: res.Id, ...newRegion });
  });
};

Region.findById = (regionId, result) => {
  sql.query(`SELECT * FROM regions WHERE id = ${regionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found region: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Region with the id
    result({ kind: "not_found" }, null);
  });
};

Region.getAll = result => {
  sql.query("SELECT * FROM regions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("regions: ", res);
    result(null, res);
  });
};

Region.updateById = (id, region, result) => {
  sql.query(
    "UPDATE regions SET title = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ? , townid = ? WHERE id = ?",
    [region.title, region.description, region.photo, region.priority, region.metakey, region.metadesc, region.townid, id],
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

      console.log("updated  region: ", { id: id, ...region});
      result(null, { id: id, ...region });
    }
  );
};

Region.remove = (id, result) => {
  sql.query("DELETE FROM regions WHERE id = ?", id, (err, res) => {
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

    console.log("deleted region with id: ", id);
    result(null, res);
  });
};

Region.removeAll = result => {
  sql.query("DELETE FROM regions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} regions`);
    result(null, res);
  });
};

module.exports = Region;
