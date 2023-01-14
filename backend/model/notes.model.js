const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
  userID: String,
});

const NotesModel = mongoose.model("notes", noteSchema);

module.exports = { NotesModel };
