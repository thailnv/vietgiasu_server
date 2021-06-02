const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3001;
//auto get index.js
const route = require("./routes/index");

//set env config path
dotenv.config({
  path: "./config.env",
});

//db connect
const db = require("./config/db");
db.connect();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routing
route(app);

//port listening
app.listen(port, () => console.log(`App listen at port ${port}`));
