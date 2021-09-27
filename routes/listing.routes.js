module.exports = app => {
  const listings = require("../controllers/listing.controller.js");

  // Create a new Listing
  app.post("/listings", listings.create);

  // Retrieve all Listing
  app.get("/listings", listings.findAll);

  // Retrieve a single Listing with listingId
  app.get("/listings/:listingId", listings.findOne);

  // Update a Customer with listingId
  app.put("/listings/:listingId", listings.update);

  // Delete a Customer with listingId
  app.delete("/listings/:listingId", listings.delete);

  // Create a new Listing
 // app.delete("/listings", listings.deleteAll);
};
