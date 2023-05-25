// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const blogModelSchema = new mongoose.Schema({
  _id: String,
  post_title: {type: String, required: true},
  comments: [{
    _id: false,
    id: String,
    content: String
  }]
});


const blogModel = mongoose.model("blogModel",blogModelSchema);

module.exports = blogModel