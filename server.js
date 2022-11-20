const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const StudentRouter = require("./Routers/StudetRouter");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.use("/students", StudentRouter);

app.listen(8000);
console.log("App is listening on port 8000");
