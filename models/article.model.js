const sql = require("./db.js");

// constructor
const Article = function(article) {
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
  this.title=article.title;
  this.summary=article.summary;
  this.description=article.description;
  this.photo=article.photo;
  this.priority=article.priority;
  this.metakey=article.metakey;
  this.metadesc=article.metadesc;
  this.url=article.url;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", { id: res.id, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.findById = (articleId, result) => {
  sql.query(`SELECT * FROM articles WHERE id = ${articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found article with the id
    result({ kind: "not_found" }, null);
  });
};

Article.getAll = result => {
  sql.query("SELECT * FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("articles: ", res);
    result(null, res);
  });
};

Article.updateById = (id, article, result) => {
  sql.query(
    "UPDATE articles SET title = ?, summary = ?, description = ?, photo = ?, priority = ?, metakey = ?, metadesc = ?, url = ? WHERE id = ?",
    [article.title, article.summary, article.description, article.photo, article.priority, article.metakey, article.metadesc, article.url, id],
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

      console.log("updated article: ", { id: id, ...article});
      result(null, { id: id, ...article });
    }
  );
};

Article.remove = (id, result) => {
  sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
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

    console.log("deleted article with id: ", id);
    result(null, res);
  });
};

Article.removeAll = result => {
  sql.query("DELETE FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} articles`);
    result(null, res);
  });
};

module.exports = Article;
