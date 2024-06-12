import express from 'express';
import { db } from '../db'; // Assuming you have a db module for MySQL connection

const router = express.Router();

// Task Creation Route
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Title, description, and status are required' });
    }

    await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error("Error during task creation:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Tasks Route
router.get('/', async (req, res) => {
  try {
    const [tasks]: any[] = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Single Task Route
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [tasks]: any[] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(tasks[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task Route
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Title, description, and status are required' });
    }

    await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task Route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM tasks WHERE id = ?', [id]);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;