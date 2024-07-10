const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

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

const writeNotes = (notes, callback) => {
  fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
    if (err) {
      console.error('Error writing notes:', err);
      return callback(err);
    }
    callback(null);
  });
};

router.get('/notes', (req, res) => {
  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(notes);
  });
});

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

module.exports = router;