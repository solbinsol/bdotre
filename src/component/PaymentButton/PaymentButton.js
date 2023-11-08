import { loadTossPayments } from "@tosspayments/payment-sdk";
import React, { useState } from "react";

const PaymentButton = ({orderId ,price ,userName ,name}) => {
  const [radio, setRadio] = useState("카드");

  const numericPrice = parseFloat(price); // 문자열을 숫자로 변환


  console.log({orderId,numericPrice,name});
  const clientKey = "test_ck_BX7zk2yd8yJKlpvoMBoA3x9POLqK";

  const tossPay = () => {
      //orderId가 필요해서 만든 랜덤 아이디값
      const random = new Date().getTime() + Math.random()
      const randomId = btoa(random)
    loadTossPayments(clientKey).then((tossPayments) => {
      const paymentOptions = {
        amount: numericPrice, // 가격
        orderId: `${randomId}`, // 주문 id
        orderName: name, // 결제 이름
        customerName: userName, // 고객 이름
        successUrl: 'http://localhost:3000/', // 성공시 리다이렉트 주소
        failUrl: 'http://localhost:3000/order', // 실패시 리다이렉트 주소
      };

      // 가상계좌 결제 시 추가 옵션
      if (radio === '가상계좌') {
        paymentOptions.validHours = 24; // 유효시간
        paymentOptions.cashReceipt = { type: '소득공제' };
      }

      // 결제 메서드 실행
      tossPayments.requestPayment(radio, paymentOptions);
    });
  };

  // 입력 핸들러
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 결제 타입 핸들러
  const handleRadioChange = (e) => {
    setRadio(e.target.value);
  };

  return (
    <>
      <input type="text" placeholder="고객 이름" value={name} onChange={handleNameChange} />
      <div>
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="카드"
          checked={radio === "카드"}
          onChange={handleRadioChange}
        />
        <label htmlFor="card">카드</label>

        <input
          type="radio"
          id="virtualAccount"
          name="paymentMethod"
          value="가상계좌"
          checked={radio === "가상계좌"}
          onChange={handleRadioChange}
        />
        <label htmlFor="virtualAccount">가상계좌</label>
      </div>

      <button onClick={tossPay}>결제하기</button>
    </>
  );
};

export default PaymentButton;
