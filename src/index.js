require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todos');
const { authenticateToken } = require('./middleware/auth');

const app = express();
app.use(express.json());

// Public route
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Protected routes
app.use('/todos', authenticateToken, todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
