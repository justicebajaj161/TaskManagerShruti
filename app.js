const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line to require the path module
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const Task = require('./models/task');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const currentDir = __dirname;
app.use(express.static(path.join(currentDir, 'frontend', 'dist', 'frontend', 'browser')));

// All other requests return the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(currentDir, 'frontend', 'dist', 'frontend', 'browser', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const tasksRoutes = require('./routes/tasks');
app.use('/api/tasks', tasksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
