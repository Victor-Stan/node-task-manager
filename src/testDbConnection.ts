import { db } from './db';

const testConnection = async () => {
  try {
    const [rows]: any = await db.query('SELECT 1 + 1 AS solution');
    console.log('The solution is:', rows[0].solution);
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

testConnection();