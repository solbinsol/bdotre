// pages/api/notice.js
import mysql from 'mysql2/promise';

// 데이터베이스 연결 정보입니다. 실제 환경에서는 환경변수를 사용하는 것이 좋습니다.
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // 데이터베이스 연결
      const connection = await mysql.createConnection(dbConfig);
      // 공지사항을 조회하는 쿼리
      const [rows] = await connection.execute('SELECT * FROM notices ORDER BY created_at DESC');
      await connection.end();

      // 조회된 공지사항을 반환합니다.
      res.status(200).json({ notices: rows });
    } catch (error) {
      console.error('Database connection or query failed:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // GET 메소드가 아닐 경우, 405 Method Not Allowed 에러를 반환합니다.
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
