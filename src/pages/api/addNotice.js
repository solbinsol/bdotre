// pages/api/addNotice.js
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const connection = await mysql.createConnection(dbConfig);
      const [result] = await connection.execute(
        `INSERT INTO notices (title, content) VALUES (?, ?)`,
        [title, content]
      );
      const addedNotice = {
        id: result.insertId,
        title,
        content,
        created_at: new Date() // 현재 날짜/시간으로 설정
      };
      await connection.end();

      res.status(201).json(addedNotice);
    } catch (error) {
      console.error('공지사항 추가 실패:', error);
      res.status(500).json({ message: '공지사항 추가 중 서버 에러 발생' });
    }
  } else {
    // POST 메소드만 허용
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
