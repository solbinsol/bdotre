import React from "react";
import style from "./Order.module.css"
import Header from "@/component/Header/Header";
const OrderPage =()=>{


    return(
        <div>
            <Header></Header>
            <div className={style.OrderPage}>
                <h2>Order / Payment</h2>
                <h3>배송 정보</h3>
                <div className={style.shipping}>
                    <p>이름 / 연락처</p><span>김솔빈 | 010-6286-7011</span>
                </div>
            </div>
        </div>
    )
}

export default OrderPage