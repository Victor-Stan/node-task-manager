import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5174' // Allow only this origin
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});