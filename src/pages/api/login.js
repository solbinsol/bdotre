// pages/api/login.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { secret } from './secret'; // 비밀 키를 포함하는 파일

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const connection = await mysql.createConnection(dbConfig);
      const [users] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
      await connection.end();

      if (users.length > 0) {
        const user = users[0];
        if (bcrypt.compareSync(password, user.password)) {
          // 비밀번호가 일치하면 JWT 생성
          const token = sign(
            { userId: user.userNum, username: user.username },
            secret,
            { expiresIn: '1h' }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      res.status(500).json({ message: '서버 에러' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
