// pages/api/signup.js

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';



const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
export default async function handler(req, res) {
  if (req.method === 'POST') {
// pages/api/signup.js
// ...
const { username, password, name, phone_number, gender, birth_date } = req.body;
// ...

    const hashedPassword = bcrypt.hashSync(password, 8); // 비밀번호 해시

    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        `INSERT INTO users (username, password, name, phone_number, gender, birth_date) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [username, hashedPassword, name, phone_number, gender, birth_date]
      );
      await connection.end();

      res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
      console.error('회원가입 에러:', error);
      res.status(500).json({ message: '서버 에러' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
