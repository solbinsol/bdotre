import React from "react";
import style from "./detail.module.css"
import Link from "next/link";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";
const Detail1 = () =>{
    



    return(
        <div>
            <Header></Header>
            <div className={style.DTALL}>
                <div className={style.DTFirst}>
                    <div className={style.DTF}>

                        <img src="./images/1.jpg" alt="ss" />
                        <div className={style.DTInfo}>
                        <h1>시어서커 셔츠</h1>
                            <ul className={style.DTli}>
                                
                            <h3>Product Info</h3>
                                <li>품번<span>SH1100</span></li>
                                <li>시즌 / 성별<span>2023 / 남,여</span></li>
                                <li className="BD">조회수<span>420</span></li>
                            </ul>
                            <ul className={style.DTli}>
                            <h3>Delivery Info</h3>
                                <li>출고 정보<span> 결제 3일 이내 출고</span></li>
                                <li>배송 정보<span> 국내 배송/로젠택배</span></li>
                                <li className="BD">조회수<span>420</span></li>
                            </ul>
                            <ul className={style.DTli}>
                            <h3>Price Info</h3>
                                <li>비닷 판매가<span> 555</span></li>
                                <li>비닷 회원가<span> 555</span></li>
                                <li className={style.BD}>비닷 적릭급<span>최대 3,000 포인트</span></li>
                                <div className={style.SizeTable}>
                                <table className={style.ST}>
                                    <thead>
                                        <tr>
                                            <th>cm/단면</th>
                                            <th>총장</th>
                                            <th>허리</th>
                                            <th>엉덩이</th>
                                            <th>허벅지</th>
                                            <th>밑위</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>S</td>
                                        <td>61</td>
                                        <td>37</td>
                                        <td>55</td>
                                        <td>37</td>
                                        <td>32</td>
                                    </tr>
                                    <tr>
                                        <td>M</td>
                                        <td>63</td>
                                        <td>38</td>
                                        <td>56</td>
                                        <td>38</td>
                                        <td>33</td>
                                    </tr>
                                    <tr>
                                        <td>L</td>
                                        <td>65</td>
                                        <td>39</td>
                                        <td>57</td>
                                        <td>39</td>
                                        <td>34</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className={style.BuyBtn}>
                                    <select name="size" className={style.OPsize}>
                                        <option value=''>사이즈 선택</option>
                                        <option value='s'>S</option>
                                        <option value='m'>M</option>
                                        <option value='l'>L</option>
                                    </select>
                                    <Link href="order">
                                        <input className={style.aa} type="submit" value="BUY NOW"/>
                                    </Link>
                                </div>
                            </div>
                            </ul>

                            
                        </div>
                    </div>
                    <div className={style.DetalShot}>
                    <h1 className="FS">FITTING PHOTO</h1>
                    <img src="./images/f1.jpg" alt="s" />
                    <img src="./images/f2.jpg" alt="s" />
                </div>
                </div>

            </div>
            <Footer></Footer>

        </div>
    )
}

export default Detail1