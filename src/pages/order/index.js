import { useState } from "react";
import React from "react";
import style from "./Order.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt from "jsonwebtoken"; 
import DaumPostcode from "react-daum-postcode";

import Header from "@/component/Header/Header";
import PaymentButton from "@/component/PaymentButton/PaymentButton";




const OrderPage =()=>{
    const [deliveryNote, setDeliveryNote] = useState(""); // 선택된 배송 요청 사항 상태
    const [customNote, setCustomNote] = useState(""); // 직접 입력한 배송 요청 사항
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");

    const [orderDetails, setOrderDetails] = useState(null);
    const [orderId , setOrderId] = useState("");
    const [ name, setName ] = useState(""); // URL 쿼리 파라미터에서 값 가져오기
    const [size , setSize] =useState("");
    const [price , setPrice] = useState("");

    const [address, setAddress] = useState(""); // 주소 상태
    const [showPostcode, setShowPostcode] = useState(false); // 우편번호 검색창 표시 상태
  
    // ... 기존 useEffect와 함수들
  
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";
  
      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
  
      setAddress(fullAddress); // 주소 상태 업데이트
      setShowPostcode(false); // 우편번호 검색창 숨김
    };
  
    const handleAddressClick = () => {
      setShowPostcode(true); // 우편번호 검색창 표시
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          const decoded = jwt.decode(storedToken);
          setUserName(decoded.username);
          setUserPhone(formatPhoneNumber(decoded.phone_number));
        }
      }, []);

    const router = useRouter();
  
    

    function formatPhoneNumber(phoneNumber) {
        // 전화번호 형식을 확인하고 하이픈을 삽입하는 정규식
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
        if (match) {
          return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return null;
      }
      

    const handleNoteChange = (e) => {
        const selectedNote = e.target.value;
        if (selectedNote === "leave-self") {
          // "직접 입력" 옵션을 선택한 경우 텍스트 입력란을 보이게 함
          setCustomNote("");
        } else {
          // 다른 옵션을 선택한 경우 텍스트 입력란을 숨김
          setCustomNote("");
        }
        setDeliveryNote(selectedNote);
      };
    
      const handleCustomNoteChange = (e) => {
        setCustomNote(e.target.value);
      };
    
      // 주문 정보를 불러오는 로직...

// 주문 페이지 컴포넌트...
// OrderPage 컴포넌트 안에서...

useEffect(() => {
  const fetchOrderDetails = async () => {
    const { orderId } = router.query;
    console.log(orderId);
    if (!orderId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/orderCheck?orderId=${orderId}`);
      const data = await response.json(); // 여기서 `data` 변수를 빼먹으셨습니다.

      if (!response.ok) {
        throw new Error(`Failed to fetch order details: ${response.statusText}`);
      }
      console.log(data);
      setOrderDetails(data); // 상태를 업데이트합니다.
      setName(data.ClothesName);
      setSize(data.Size);
      setOrderId(data.OrderID);
      setPrice(data.Price)
      // 문자열을 숫자로 변환

      // 상태 업데이트 로직을 여기에 추가하세요.
      console.log(orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
      // 에러 처리 로직을 여기에 추가하세요.
    }
  };

  fetchOrderDetails();
}, [router.query]);

    const numericPrice = parseFloat(price);
    console.log(numericPrice);
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
    console.log(formattedPrice); // "20,000" 으로 출력될 것입니다.
    
    return(
        <div>
            <Header></Header>
            <div className={style.OrderPage}>
                <h2>Order / Payment</h2>

                <div className={style.shipping}>
                    <h3>배송 정보</h3>
                    <div className={style.Left}>
                        <p>이름 / 연락처</p>
                        <p>주소 </p>
                        <label>요청 사항:</label>
                    
                    </div>
                    <div className={style.Right}>
                        <p>{userName} / {userPhone}</p>
                        <input type="text" value={address} readOnly onClick={handleAddressClick} />                        <select className={style.Select} value={deliveryNote} onChange={handleNoteChange}>
                            <option value="">배송 요청 사항을 선택하세요</option>
                            <option value="leave-security">부재시 경비실에 놔주세요</option>
                            <option value="leave-front-door">부재시 문앞에 놔주세요</option>
                            <option value="leave-self">직접 입력</option>

                        </select>
                        {deliveryNote === "leave-self" && (
                        <textarea className={style.Self}
                            value={customNote}
                            onChange={handleCustomNoteChange}
                            placeholder="배송 요청 사항을 입력하세요"
                        />
                        )}
                        {showPostcode && (
                          <div className={style.postcode}>
                            <DaumPostcode onComplete={handleComplete} className="post-code" />
                            <button onClick={() => setShowPostcode(false)}>닫기</button>
                          </div>
                          )}
                    </div>
                    
                </div>
                <div className={style.ProductInfo}>
                    <h3>상품 정보</h3>
                    <p>주문번호 : {orderId} </p>
                    <p>상품명: {name}</p>
                    <p>선택 사이즈: {size}</p>
                    <p>가격: {formattedPrice}원</p>
                    {/* 나머지 UI 요소 */}
                </div>
                <PaymentButton 
                  orderId={orderId}
                  price={price}
                  userName={userName}
                  name={name}
                />

            </div>
        </div>
    )
}

export default OrderPage