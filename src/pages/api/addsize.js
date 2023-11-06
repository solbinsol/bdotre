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
      // req.body의 구조 분해 할당 시 기본값 제공
      const { ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise } = req.body;
  
      try {
        connection = await mysql.createConnection(dbConfig);
  
        // SizeID는 오토 인크리먼트 필드라고 가정합니다.
        const query = `
          INSERT INTO ClothesSizes
          (ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [ClothesNum, Size, TotalLength, Waist, Hips, Thigh, Rise];
  
        await connection.execute(query, values);
        await connection.end();
  
        res.status(201).json({ message: '사이즈 정보가 성공적으로 추가되었습니다.' });
      } catch (error) {
        console.error('사이즈 정보 추가 실패:', error.message); // 오류 메시지 개선
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
  