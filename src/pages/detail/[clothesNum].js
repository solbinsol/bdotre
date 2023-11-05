import React from "react";
import { useRouter } from "next/router";
import style from "./detail.module.css"
import Link from "next/link";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
  export async function getServerSideProps(context) {
    const { clothesNum } = context.params;

    let product = {};
    let sizes = [];

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // 옷 정보를 가져오는 쿼리
        const [productRows] = await connection.execute(
            'SELECT * FROM Clothes WHERE ClothesNum = ?',
            [Number(clothesNum)]
        );
        product = productRows[0] || null;

        // 사이즈 정보를 가져오는 쿼리
        const [sizeRows] = await connection.execute(
            'SELECT * FROM ClothesSizes WHERE ClothesNum = ?',
            [Number(clothesNum)]
        );
        sizes = sizeRows;

        await connection.end();
    } catch (error) {
        console.error('Database connection or query failed:', error);
    }
    
    // product와 sizes 정보를 props로 페이지 컴포넌트에 전달합니다.
    return { props: { product, sizes } };
}

    const DetailPage = ({ product,sizes  }) => {

    return(
        <div>
            <Header></Header>
            <div className={style.DTALL}>
                <div className={style.DTFirst}>
                    <div className={style.DTF}>
                    <img src={product.ClothesPicture} alt="ss" />
                        <div className={style.DTInfo}>
                        <h1>{product.ClothesName}</h1>
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
                                <li>비닷 판매가<span> {product.Price}0</span></li>
                                <li>비닷 회원가<span> {(Number(product.Price) - 1).toFixed(2)}0 </span></li>
                                <li className={style.BD}>비닷 적릭급<span>최대 3,000 포인트</span></li>
                                <div className={style.SizeTable}>
                                <table className={style.ST}>
                                    <thead>
                                    <tr>
                        <th>사이즈</th>
                        <th>총장</th>
                        <th>허리</th>
                        <th>엉덩이</th>
                        <th>허벅지</th>
                        <th>밑위</th>
                    </tr>
                                    </thead>
                                    <tbody>
                    {sizes.map((size) => (
                        <tr key={size.SizeID}>
                            <td>{size.Size}</td>
                            <td>{size.TotalLength}</td>
                            <td>{size.Waist}</td>
                            <td>{size.Hips}</td>
                            <td>{size.Thigh}</td>
                            <td>{size.Rise}</td>
                        </tr>
                    ))}
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
                    <img src="/images/f1.jpg" alt="s" />
                    <img src="/images/f2.jpg" alt="s" />
                </div>
                </div>

            </div>
            <Footer></Footer>

        </div>
    )
}

export default DetailPage