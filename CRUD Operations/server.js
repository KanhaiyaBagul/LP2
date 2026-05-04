require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Changed to 5000 to prevent conflict

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crud_practical';

mongoose.connect(MONGODB_URI)
  .then(() => {
      const dbType = MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB';
      console.log(`✅ Connected to ${dbType} Successfully!`);
  })
  .catch((err) => console.error('❌ Could not connect to MongoDB:', err.message));

// ==========================================
// 1. Mongoose Model (Schema)
// ==========================================
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
    createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model('Item', ItemSchema);

// ==========================================
// 2. CRUD API Endpoints
// ==========================================

const path = require('path');

// Serve the frontend dashboard
app.use(express.static(path.join(__dirname, 'public')));

// C: CREATE API (POST)
// Endpoint: POST /api/items
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item created successfully', data: savedItem });
    } catch (error) {
        res.status(400).json({ message: 'Error creating item', error: error.message });
    }
});

// R: READ API (GET)
// Endpoint: GET /api/items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ message: 'Items fetched successfully', data: items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});

// U: UPDATE API (PUT)
// Endpoint: PUT /api/items/:id
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Return updated doc, run validators
        );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        res.status(400).json({ message: 'Error updating item', error: error.message });
    }
});

// D: DELETE API (DELETE)
// Endpoint: DELETE /api/items/:id
app.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully', data: deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/items`);
});
