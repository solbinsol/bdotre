// Next.js API 라우트 예시

export default async (req, res) => {
    const { orderId } = req.query;
    
    // 데이터베이스에서 주문 정보를 조회하는 로직...
    const orderDetails = await getOrderFromDatabase(orderId);
    
    if (orderDetails) {
        // 주문 정보를 응답으로 반환
        return res.status(200).json(orderDetails);
    } else {
        // 주문 정보가 없는 경우
        return res.status(404).json({ message: 'Order not found' });
    }
};
