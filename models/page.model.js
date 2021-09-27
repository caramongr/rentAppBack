const sql = require("./db.js");

// constructor
const Page = function(page) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=page.title;
  this.summary=page.summary;
  this.description=page.description;
  this.photo=page.photo;
  this.priority=page.priority;
  this.metakey=page.metakey;
  this.metadesc=page.metadesc;
  this.url=page.url;
};

Page.create = (newPage, result) => {
  sql.query("INSERT INTO pages SET ?", newPage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created page: ", { id: res.id, ...newPage });
    result(null, { id: res.insertId, ...newPage });
  });
};

Page.findById = (pageId, result) => {
  sql.query(`SELECT * FROM pages WHERE id = ${pageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found page: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Page with the id
    result({ kind: "not_found" }, null);
  });
};

Page.getAll = result => {
  sql.query("SELECT * FROM pages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pages: ", res);
    result(null, res);
  });
};

Page.updateById = (id, page, result) => {
  sql.query(
    "UPDATE pages SET title = ?, summary = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ?, url = ? WHERE id = ?",
    [page.title, page.summary, page.description, page.photo, page.priority, page.metakey, page.metadesc, page.url, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Page with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated page: ", { id: id, ...page});
      result(null, { id: id, ...page });
    }
  );
};

Page.remove = (id, result) => {
  sql.query("DELETE FROM pages WHERE id = ?", id, (err, res) => {
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

    console.log("deleted page with id: ", id);
    result(null, res);
  });
};

Page.removeAll = result => {
  sql.query("DELETE FROM pages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pages`);
    result(null, res);
  });
};

module.exports = Page;
