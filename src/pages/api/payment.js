// pages/api/payment.js


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, orderId, name, size, customerName, bank } = req.body;

    const numericAmount = parseFloat(amount);

    const secretKey = process.env.TOSS_SECRET_KEY;
    const encodedKey = Buffer.from(`${secretKey}:`).toString('base64'); // 

    const response = await fetch('https://api.tosspayments.com/v1/payments', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedKey}`, // 인코딩된 키를 사용합니다.
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderNo: orderId,
      amount: numericAmount,
      amountTaxFree: 0,           // 비과세 금액 (없다면 0으로 설정)
      productDesc: `${name} - ${size}`,
      apiKey: 'test_sk_LlDJaYngro7dAA0RlWBmrezGdRpX',
      payToken:"example-payToken", 

      successUrl: 'http://localhost:3000/payment/success',
      failUrl: 'http://localhost:3000/payment/fail',
      cancelUrl: 'http://localhost:3000/payment/cancel',
      autoExecute: true,          // 자동 승인 설정 (필수)
      resultCallback: 'https://localhost:3000/api/payment/callback', // 결제 결과 callback 웹 URL (필수)
      callbackVersion: 'V2',      // callback 버전 (필수)
    }),

        });

    const paymentData = await response.json();
    console.log(paymentData); // 응답 데이터 로깅

    if (response.status === 200) {
      res.status(200).json(paymentData);
    } else {
      res.status(response.status).json(paymentData);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
