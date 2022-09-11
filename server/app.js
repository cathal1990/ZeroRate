const express = require('express')
const path = require('path')
// const cors = require('cors')
// const volleyball = require('volleyball')
const app = express()


app.use(express.static(path.join(__dirname, '..','public')))

// app.use(cors())
// app.use(volleyball)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", require("./api"));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

app.use((req, res, next) => {
  const error = Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;

