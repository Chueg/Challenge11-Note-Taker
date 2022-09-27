const router = require("express").Router();
const {notes} = require('../../db/db.json');
const fs = require('fs');
const uuid = require('../../helpers/uuid');


router.get("/notes", (req, res) => {

    let results = notes;

    res.json(results);
});

router.post("/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
req.body.id = uuid();

  const {title, text, id} = req.body;
  // If all the required properties are present
  if (title && text)
  {
    const newNote = {
      title,
      text,
      id
    };

    notes.push(newNote);

    
  }

  fs.writeFile(
    './db/db.json',
    JSON.stringify({notes}, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );


  res.json();
});


router.delete("notes/:id", (req, res) => {
  // finds the notes with the given id of the request
  const result = notes.filter((note) => note.id === req.params.id)[0];
//finds the index of the notes
  let index = notes.findIndex( note => note.id === result.id);
//removes the note at the given index
  notes.splice(index,1);
  //writes the notes with the deleted files to db
  fs.writeFile(
    './db/db.json',
    JSON.stringify({notes}, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );

  return res.send();

});

module.exports = router;