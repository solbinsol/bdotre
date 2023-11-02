import { useState } from "react";
import React from "react";
import style from "./Order.module.css"
import Header from "@/component/Header/Header";
const OrderPage =()=>{
    const [deliveryNote, setDeliveryNote] = useState(""); // 선택된 배송 요청 사항 상태
    const [customNote, setCustomNote] = useState(""); // 직접 입력한 배송 요청 사항
  


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
    
    return(
        <div>
            <Header></Header>
            <div className={style.OrderPage}>
                <h2>Order / Payment</h2>

                <div className={style.shipping}>
                    <h3>배송 정보</h3>
                    <div className={style.Left}>
                        <p>이름 / 연락처 </p>
                        <p className={style.inputp}>주소 </p>
                        <label>배송 요청 사항:</label>
                    
                    </div>
                    <div className={style.Right}>
                        <p>김솔빈 | 010-6286-7011</p>
                        <p><input type="text"/></p>
                        <select className={style.Select} value={deliveryNote} onChange={handleNoteChange}>
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
                    </div>
                </div>
                <div className={style.shipping}>
                    <div>
                        <h3>상품정보</h3>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderPage