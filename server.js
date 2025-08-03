// server.js
const express = require('express'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

// === Middleware ===
// Enable Cross-Origin Resource Sharing (CORS) so your front-end can talk to this server
app.use(cors());
// Enable the express server to parse incoming JSON data
app.use(express.json());

// === Placeholder for Database Connection ===
// In a real application, you would initialize your database connection here.
// For example, using packages like 'pg' for PostgreSQL, 'mysql2' for MySQL, or 'mongoose' for MongoDB.
// const db = require('./db-connection'); 

// === API Route to handle form submissions ===
app.post('/api/orders', (req, res) => {
    // Get data from the request body sent by the front-end
    const { name, phone, address, "order-details": orderDetails } = req.body;

    // --- 1. Basic Validation ---
    if (!name || !phone || !address || !orderDetails) {
        // If any field is missing, send a 400 Bad Request error
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    console.log('Received Order:', { name, phone, address, orderDetails });
    
    // --- 2. Database Logic Goes Here ---
    // This is where you would write the code to insert the data into your database.
    // For example (this is pseudocode and won't run):
    // db.query('INSERT INTO orders (name, phone, address, details) VALUES (?, ?, ?, ?)', 
    //   [name, phone, address, orderDetails], 
    //   (error, results) => {
    //      if (error) {
    //          console.error('Database error:', error);
    //          return res.status(500).json({ message: 'Failed to save order.' });
    //      }
    //      // If successful, send a success response
    //      res.status(201).json({ message: 'Your order has been received and is being processed!' });
    //   }
    // );
    
    // --- 3. Sending Success Response (for now) ---
    // Since we don't have a database connected yet, we'll just send a success message.
    // Replace this with the database logic above when you're ready.
    res.status(201).json({ message: 'Your order has been received. We will call you shortly to confirm.' });
});


// === Start the server ===
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});