import mysql from 'mysql2/promise';

// 데이터베이스 설정
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
};

// 데이터베이스에 주문을 저장하는 함수
async function saveOrder(orderData) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        // 주문 데이터를 데이터베이스에 삽입하는 SQL 쿼리
        const [rows] = await connection.execute(
            'INSERT INTO Orders (ClothesName, Size, Price) VALUES (?, ?, ?)',
            [orderData.name, orderData.size, orderData.price]
        );
        
        // 삽입된 주문의 ID를 반환
        return rows.insertId;
    } catch (error) {
        throw error;
    } finally {
        await connection.end(); // 데이터베이스 연결 종료
    }
}

// API 핸들러
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // 데이터베이스에 주문 정보를 저장하고 주문 ID를 받음
            const orderId = await saveOrder(req.body);
            
            // 성공적으로 주문을 저장했으면 주문 ID를 응답으로 반환
            res.status(200).json({ orderId });
        } catch (error) {
            // 데이터베이스 오류 처리
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error occurred.' });
        }
    } else {
        // POST 메서드가 아닌 경우 에러 반환
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
