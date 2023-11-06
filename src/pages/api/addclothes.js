// pages/api/addclothes.js

import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'BDOT'
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clothesData } = req.body;

    try {
      const connection = await mysql.createConnection(dbConfig);

      // 옷 정보만 추가하는 쿼리
      const [clothesResult] = await connection.execute(
        'INSERT INTO Clothes (ClothesName, Price, ClothesPicture) VALUES (?, ?, ?)',
        [clothesData.ClothesName, clothesData.Price, clothesData.ClothesPicture]
      );

      // 옷 정보가 성공적으로 추가되었다면 해당 옷의 ID를 응답으로 반환
      res.status(201).json({ clothesId: clothesResult.insertId });

      await connection.end();
    } catch (error) {
      console.error('의류 정보 추가 실패:', error);
      res.status(500).json({ message: '서버 에러' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
