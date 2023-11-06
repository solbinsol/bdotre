import mysql from 'mysql2/promise';


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
  

export default async function handler(req, res) {
    let connection;
    
    if (req.method === 'POST') {
      const { ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise } = req.body;
  
      try {
        connection = await mysql.createConnection(dbConfig);
  
        const query = `
          INSERT INTO ClothesSizes
          (ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise];
  
        // 여기서 execute 함수는 삽입된 행의 ID를 포함하는 객체를 반환합니다.
        const [result] = await connection.execute(query, values);
        await connection.end();
  
        // 삽입된 사이즈의 ID를 사용하여 추가된 사이즈 정보를 클라이언트에게 반환합니다.
        // 예시에서는 ID만 반환하고 있지만 필요에 따라 추가적인 정보를 조회하여 반환할 수도 있습니다.
        res.status(201).json({ addedSizeId: result.insertId });
      } catch (error) {
        console.error('사이즈 정보 추가 실패:', error.message);
        if (connection) {
          await connection.end();
        }
        res.status(500).json({ message: '서버 에러: ' + error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  