const sql = require("./db.js");

// constructor
const State = function(state) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=state.title;
  this.description=state.description;
  this.photo=state.photo;
  this.priority=state.priority;
  this.metakey=state.metakey;
  this.metadesc=state.metadesc;
  this.countryid=state.countryid;
};

State.create = (newState, result) => {
  sql.query("INSERT INTO states SET ?", newState, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created state: ", { id: res.id, ...newState});
    result(null, { id: res.Id, ...newState });
  });
};

State.findById = (stateId, result) => {
  sql.query(`SELECT * FROM countries WHERE id = ${stateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found state: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found State with the id
    result({ kind: "not_found" }, null);
  });
};

State.getAll = result => {
  sql.query("SELECT * FROM states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("states: ", res);
    result(null, res);
  });
};

State.updateById = (id, state, result) => {
  sql.query(
    "UPDATE states SET title = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ? , countryid = ? WHERE id = ?",
    [state.title, state.description, state.photo, state.priority, state.metakey, state.metadesc, state.countryid, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found State with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated  state: ", { id: id, ...state});
      result(null, { id: id, ...state });
    }
  );
};

State.remove = (id, result) => {
  sql.query("DELETE FROM states WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found State with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted state with id: ", id);
    result(null, res);
  });
};

State.removeAll = result => {
  sql.query("DELETE FROM states", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} states`);
    result(null, res);
  });
};

module.exports = State;
