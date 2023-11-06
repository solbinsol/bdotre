// pages/api/detail.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'BDOT'
};

export default async function handler(req, res) {
  let { clothesNum } = req.query;


  clothesNum = Number(clothesNum);


  try {
    const connection = await mysql.createConnection(dbConfig);

    // 옷 정보를 가져오는 쿼리
    const [productRows] = await connection.execute(
      'SELECT * FROM Clothes WHERE ClothesNum = ?',
      [clothesNum]
    );

    // 사이즈 정보를 가져오는 쿼리
    const [sizeRows] = await connection.execute(
      'SELECT * FROM ClothesSizes WHERE ClothesNum = ?',
      [clothesNum]
    );

    await connection.end();

    // 상품 정보와 사이즈 정보를 함께 반환
    res.status(200).json({ product: productRows[0], sizes: sizeRows });
  } catch (error) {
    console.error('Database connection or query failed:', error);
    res.status(500).send('Internal Server Error');
  }
}
