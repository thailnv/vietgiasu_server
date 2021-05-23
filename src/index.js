const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3001;
//auto get index.js
const route = require("./routes/index");

//HTTP logger
//db connect
const db = require("./config/db");
db.connect();

//image folder
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1); // trust first proxy

// routing
route(app);

//port listening
app.listen(port, () => console.log(`App listen at port ${port}`));
