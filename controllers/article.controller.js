const Article = require("../models/article.model.js");

// Create and Save a new Article
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Article
  const article= new Article({
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc
  });

  // Save Page in the database
 Article.create(article, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    else res.send(data);
  });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  Article.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    else res.send(data);
  });
};

// Find a single Article with a articleId
exports.findOne = (req, res) => {
  Article.findById(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Article with id ${req.params.articleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Article with id " + req.params.articleId
        });
      }
    } else res.send(data);
  });
};

// Update an Article identified by the articleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

 Article.updateById(
    req.params.articleId,
    new Article(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Article with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Article with id " + req.params.articleId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Article with the specified articleId in the request
exports.delete = (req, res) => {
  Article.remove(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Article with id ${req.params.articleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Article with id " + req.params.articleId
        });
      }
    } else res.send({ message: `Article was deleted successfully!` });
  });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
  Article.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    else res.send({ message: `All Articles were deleted successfully!` });
  });
};
