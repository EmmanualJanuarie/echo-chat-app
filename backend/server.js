// backend/app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port than React's default

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});