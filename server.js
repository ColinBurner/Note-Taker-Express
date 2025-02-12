const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes'); 

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

app.get('/', (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API routes
app.use('/api', notesRouter);

// Catch-all route to serve the custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});