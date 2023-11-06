// pages/api/clothes.js
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM Clothes');
    await connection.end();

    res.status(200).json({ clothes: rows });
  } catch (error) {
    console.error('API route connection or query failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
