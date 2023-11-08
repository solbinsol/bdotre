// pages/api/orderCheck.js
import mysql from 'mysql2/promise';

// 데이터베이스 설정
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
};

// 주문 정보를 데이터베이스에서 가져오는 함수
async function getOrderById(orderId) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        // 주문 ID에 해당하는 주문 데이터를 데이터베이스에서 가져오는 SQL 쿼리
        const [rows] = await connection.execute(
            'SELECT * FROM Orders WHERE OrderID = ?',
            [orderId]
        );
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        connection.end();
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { orderId } = req.query;
        if (!orderId) {
            res.status(400).json({ error: 'Order ID is required' });
            return;
        }

        try {
            const order = await getOrderById(orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ error: 'Order not found' });
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
