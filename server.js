const fs = require("fs");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// user public assets
app.use(express.static('public'));
// parse incoming JSON data
app.use(express.json());

// connect to routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


//Are you listening?
app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));