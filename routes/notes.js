// Imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Function to read notes from the db.json file
const readNotes = (callback) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notes:', err);
      return callback(err);
    }
    try {
      const notes = JSON.parse(data);
      callback(null, notes);
    } catch (parseError) {
      console.error('Error parsing notes:', parseError);
      callback(parseError);
    }
  });
};

// Function to write notes to the db.json file
const writeNotes = (notes, callback) => {
  fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
    if (err) {
      console.error('Error writing notes:', err);
      return callback(err);
    }
    callback(null);
  });
};

// GET route to retrieve all notes
router.get('/notes', (req, res) => {
  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(notes);
  });
});

// POST route to add a new note
router.post('/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    notes.push(newNote);
    writeNotes(notes, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save note' });
      }
      res.json(newNote);
    });
  });
});

// DELETE route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    writeNotes(updatedNotes, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete note' });
      }
      res.json({ message: 'Note deleted' });
    });
  });
});

// Exports the router
module.exports = router;