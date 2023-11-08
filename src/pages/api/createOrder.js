// Next.js API 라우트 예시

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, size, price } = req.body;
        
        // 주문 정보를 데이터베이스에 저장하는 로직...
        const orderId = await saveOrderToDatabase(name, size, price);
        
        // 저장 후 주문 ID를 응답으로 반환
        return res.status(200).json({ orderId });
    } else {
        // POST 요청이 아닌 경우 에러 처리
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
