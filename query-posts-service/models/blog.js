// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const blogModelSchema = new Schema({
  id: Number,
  post: String,
  comments: [{
    comment_id: Number,
    content: String
  }]
});


const blogModel = mongoose.model("blogModel",blogModelSchema);

module.exports = blogModel