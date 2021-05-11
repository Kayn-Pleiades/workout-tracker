// Required Packaged
const express = require('express');
const mongoose = require("mongoose");
const logger = require('morgan');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Set up logger 
app.use(logger("dev"));

// Routes
app.use(require("./routes/api.js"));
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, () => console.log(`App now listening at localhost:${PORT}`));