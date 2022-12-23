const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const crypto = require("crypto");

const PORT = process.env.PORT || 8001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  newNote.id = crypto.randomBytes(16).toString("hex");
  noteData.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.json(noteData);
});

app.delete("/api/notes/:id", (req, res) => {
  let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = req.params.id.toString();
  let newNoteData = noteData.filter((note) => note.id.toString() !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(newNoteData));
  res.json(newNoteData);
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
