import React from "react";
import style from "./detail.module.css"
import Link from "next/link";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";
import { useRouter } from "next/router";
import { useState } from "react";

  // 해당 페이지 컴포넌트의 getServerSideProps 함수
// pages/detail/[clothesNum].js

export async function getServerSideProps(context) {
    const { clothesNum } = context.params;
    let product = null; // 기본값을 null로 설정
    let sizes = null; // 기본값을 null로 설정
  
    try {
      // 내부 API 라우트를 호출하여 데이터 검색
      const res = await fetch(`http://localhost:3000/api/detail?clothesNum=${Number(clothesNum)}`);
      if (!res.ok) {
        // 응답이 성공적이지 않은 경우
        throw new Error(`Failed to fetch data, status code: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
  
      // data.product가 존재하지 않는 경우, product와 sizes는 이미 null로 설정되어 있습니다.
      if (data && data.product) {
        product = data.product;
        sizes = data.sizes;
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      // 에러가 발생했을 때 적절한 처리를 합니다. 예를 들어, 에러 로깅, 오류 페이지로 리다이렉션 등
    }
  
    // props로 null이나 실제 데이터를 전달합니다.
    return { props: { product, sizes } };
  }
  
  

    const DetailPage = ({ product,sizes  }) => {
        const router = useRouter();
        const [selectedSize, setSelectedSize] = useState(''); // 추가된 부분

       
// 이전에 상품 상세 정보와 구매하기 버튼 로직...
const handleBuyNow = async () => {
  if (!selectedSize) {
    alert('사이즈를 선택해주세요.');
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: product.ClothesName,
        size: selectedSize,
        price: product.Price
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    router.push(`/order?orderId=${data.orderId}`);
  } catch (error) {
    console.error('주문 실패:', error);
    alert('주문 처리 중 오류가 발생했습니다.',error);
  }
};

  const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

    return(
        <div>
            <Header></Header>
            <div className={style.DTALL}>
                <div className={style.DTFirst}>
                    <div className={style.DTF}>
                    <img src={product.ClothesPicture} alt={product.ClothesName} />
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
                                <li>비닷 판매가<span> {formatPrice(product.Price)}</span></li>
                                <li>비닷 회원가<span> {formatPrice(product.Price -2000) } </span></li>
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
                                <select name="size" className={style.OPsize} onChange={(e) => setSelectedSize(e.target.value)}>
                                <option value=''>사이즈 선택</option>
                                    {sizes.map((size) => (
                                        <option key={size.SizeID} value={size.Size}>{size.Size}</option> 
                                ))}
                                </select>
                                        <input className={style.aa} onClick={handleBuyNow} type="submit" value="BUY NOW"/>
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