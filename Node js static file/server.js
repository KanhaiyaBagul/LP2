const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve all static files (HTML, CSS, JS, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the Node.js server
app.listen(PORT, () => {
    console.log(`Node.js Express Server is running!`);
    console.log(`Please open your browser and visit: http://localhost:${PORT}`);
});
