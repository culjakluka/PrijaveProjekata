require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const projectInfo = require("./routes/projectInfo");
const dean = require("./routes/dean");
const department = require("./routes/department");
const pdf = require("./routes/pdf");
const csv = require("./routes/csv");
const testInfoToPDF = require("./routes/testInfoToPDF");
const cors = require("cors");

require("express-async-errors");

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors(corsOpts));
//body parser?

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/projectInfo", projectInfo);
app.use("/api/dean", dean);
app.use("/api/department", department);
app.use("/api/pdf", pdf);
app.use("/api/csv", csv);
app.use("/api/generate-pdf", testInfoToPDF);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// connect to database
const db_uri = `${process.env.MONGO_URI}`;

mongoose
  .connect(db_uri)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database & listening on port ",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
