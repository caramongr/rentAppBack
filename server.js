const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')


const app = express();
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/customer.routes.js")(app);

require("./routes/listing.routes.js")(app);

require("./routes/country.routes.js")(app);

require("./routes/state.routes.js")(app);

require("./routes/town.routes.js")(app);

require("./routes/region.routes.js")(app);

require("./routes/category.routes.js")(app);

require("./routes/page.routes.js")(app);

require("./routes/article.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
