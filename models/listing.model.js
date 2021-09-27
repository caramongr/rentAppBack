const sql = require("./db.js");

// constructor
const Listing = function(listing) {
  this.title = listing.title;
  this.summary=listing.summary;
  this.description=listing.description;
  this.photo=listing.photo;
  this.squaremeters=listing.squaremeters;
  this.bedrooms=listing.bedrooms;
  this.map=listing.map;
  this.pets=listing.pets;
  this.emailalert=listing.emailalert;
  this.region=listing.region;
  this.town=listing.town;
  this.state=listing.state;
  this.country=listing.country;
  this.bathrooms=listing.bathrooms;
  this.furniture=listing.furniture;
  this.furnitureremove=listing.furnitureremove;
  this.amenities=listing.amenities;
  this.type=listing.type;
  this.floor=listing.floor;
  this.priority=listing.priority;
  this.metadesc=listing.metadesc;
  this.metakey=listing.metakey;
  this.price=listing.price;
  this.owner=listing.owner;
};

Listing.create = (newListing, result) => {
  sql.query("INSERT INTO listings SET ?", newListing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created listing: ", { id: res.insertId, ...newListing });
    result(null, { id: res.insertId, ...newListing });
  });
};

Listing.findById = (listingId, result) => {
  sql.query(`SELECT * FROM listings WHERE id = ${listingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found listing: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Listing with the id
    result({ kind: "not_found" }, null);
  });
};

Listing.getAll = result => {
  sql.query("SELECT * FROM listings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};

Listing.updateById = (id, listing, result) => {
  sql.query(
    "UPDATE listings SET title= ?, summary = ?, description = ?, photo= ?, squaremeters=?, bedrooms=?,  map=?, pets=?, emailalert=?, region=?, town=?, state=?, country=?, bathrooms=?, furniture=?, furnitureremove=?, amenities=?, type=?, floor=?, priority=?, metadesc=?, metakey=?, price=?, owner=? WHERE id = ?",
    [listing.title, listing.summary, listing.description, listing.photo, listing.squaremeters, listing.bedrooms, listing.map, listing.pets,listing.emailalert,  listing.region, listing.town, listing.state, listing.country, listing.bathrooms, listing.furniture, listing.furnitureremove, listing.amenities,listing.type, listing.floor, listing.priority, listing.metadesc, listing.metakey, listing.price, listing.owner, id],
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

      console.log("updated listing: ", { id: id, ...listing });
      result(null, { id: id, ...listing });
    }
  );
};

Listing.remove = (id, result) => {
  sql.query("DELETE FROM listings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found listingr with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted listing with id: ", id);
    result(null, res);
  });
};

Listing.removeAll = result => {
  sql.query("DELETE FROM listings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} listings`);
    result(null, res);
  });
};

module.exports = Listing;
