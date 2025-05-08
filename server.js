nnpconst express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (like CSS, JS, etc.) from the project directory
app.use(express.static(path.join(__dirname, '/')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// In-memory task storage
let tasks = [];

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint to add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task content is required' });
  }
  tasks.push(task);
  res.status(201).json({ message: 'Task added', tasks });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});