const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
  console.log("Serving notes.html");
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
  console.log("GET request to /api/notes");
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notes:', err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (parseError) {
      console.error('Error parsing notes:', parseError);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };
  console.log('Saving new note:', newNote);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notes:', err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    try {
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error('Error writing note:', err);
          return res.status(500).json({ error: 'Failed to save note' });
        }
        res.json(newNote);
      });
    } catch (parseError) {
      console.error('Error parsing notes:', parseError);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  console.log('Deleting note with ID:', noteId);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notes:', err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    try {
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== noteId);

      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error('Error deleting note:', err);
          return res.status(500).json({ error: 'Failed to delete note' });
        }
        res.json({ message: 'Note deleted' });
      });
    } catch (parseError) {
      console.error('Error parsing notes:', parseError);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});