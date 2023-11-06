// pages/api/clothesDelete.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'BDOT'
};

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { clothesNum } = req.query;
    let connection;

    try {
      connection = await mysql.createConnection(dbConfig);

      // 먼저 해당 옷의 모든 사이즈를 삭제합니다.
      await connection.execute('DELETE FROM ClothesSizes WHERE ClothesNum = ?', [clothesNum]);

      // 옷 데이터를 삭제합니다.
      await connection.execute('DELETE FROM Clothes WHERE ClothesNum = ?', [clothesNum]);

      await connection.end();
      res.status(200).json({ message: '옷과 사이즈가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error('옷 삭제 실패:', error);
      if (connection) {
        await connection.end();
      }
      res.status(500).json({ message: '서버 에러' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
