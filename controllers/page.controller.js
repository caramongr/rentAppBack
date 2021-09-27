const Page = require("../models/page.model.js");

// Create and Save a new Page
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Page
  const page= new Page({
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description,
    photo: req.body.photo,
    priority: req.body.priority,
    metakey: req.body.metakey,
    metadesc: req.body.metadesc
  });

  // Save Page in the database
 Page.create(page, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Page."
      });
    else res.send(data);
  });
};

// Retrieve all Pages from the database.
exports.findAll = (req, res) => {
  Page.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pages."
      });
    else res.send(data);
  });
};

// Find a single Page with a pageId
exports.findOne = (req, res) => {
  Page.findById(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Page with id " + req.params.pageId
        });
      }
    } else res.send(data);
  });
};

// Update a Page identified by the pageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Page.updateById(
    req.params.pageId,
    new Page(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Page with id ${req.params.pageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Page with id " + req.params.pageId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Page with the specified pageId in the request
exports.delete = (req, res) => {
  Page.remove(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Page with id " + req.params.pageId
        });
      }
    } else res.send({ message: `Page was deleted successfully!` });
  });
};

// Delete all Pages from the database.
exports.deleteAll = (req, res) => {
  Page.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pages."
      });
    else res.send({ message: `All Pages were deleted successfully!` });
  });
};
