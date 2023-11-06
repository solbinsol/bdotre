// pages/api/deleteNotice.js
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
  

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // req.body에서 공지사항 ID 추출
    const { id } = req.body;

    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(`DELETE FROM notices WHERE id = ?`, [id]);
      await connection.end();

      res.status(200).json({ message: '공지사항이 삭제되었습니다.' });
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
      res.status(500).json({ message: '공지사항 삭제 중 서버 에러 발생' });
    }
  } else {
    // POST 메소드만 허용
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
