const sql = require("./db.js");

// constructor
const Category = function(category) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=category.title;
  this.summary=category.summary;
  this.description=category.description;
  this.photo=category.photo;
  this.priority=category.priority;
  this.metakey=category.metakey;
  this.metadesc=category.metadesc;
  this.url=category.url;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.id, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM categories WHERE id = ${cateogoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET title = ?,  summary = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ?, url = ? WHERE id = ?",
    [category.title,  category.summary, category.description, category.photo, category.priority, category.metakey, category.metadesc, category.url, id],
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

      console.log("updated category: ", { id: id, ...category});
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
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

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = result => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} categories`);
    result(null, res);
  });
};

module.exports = Category;
