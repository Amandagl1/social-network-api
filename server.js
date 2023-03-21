const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));


//--Setting up MongoDB connection--
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-Trex",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  mongoose.set("debug", true);
  
  app.listen(PORT, () => console.log(`App connected! Listening on port:${PORT}!`));