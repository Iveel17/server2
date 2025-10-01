// Import required packages
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Use middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable the Express app to parse JSON formatted request bodies

// Define a simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MERN backend!' });
});

// Get the port from environment variables, with a default fallback
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port gs ${PORT}.`);
});