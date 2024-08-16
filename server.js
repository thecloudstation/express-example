require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, getStorage, toggleStorage } = require('./config/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Attempt to connect to the database
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB, using in-memory storage:', err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.get('/api/storage-info', (req, res) => {
    res.json({ currentStorage: getStorage() });
});

app.post('/api/toggle-storage', (req, res) => {
    toggleStorage();
    res.json({ message: 'Storage toggled', currentStorage: getStorage() });
});

// Serve admin and user pages
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user', 'index.html'));
});

// Redirect root to /admin
app.get('/', (req, res) => {
    res.redirect('/user');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});