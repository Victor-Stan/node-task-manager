import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db'; // Assuming you have a db module for MySQL connection

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if user already exists
    const [existingUser]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;