import React from "react";
import style from './main.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Slider from "../component/Slider/Slider";
import Footer from "../component/Footer/Footer";
import Header from "@/component/Header/Header";
import  { useEffect } from 'react';
import { useRouter } from 'next/router';



// 페이지 컴포넌트 내부
export async function getServerSideProps(context) {
    let clothes = [];
    try {
      // 내부 API 라우트를 호출하여 데이터 검색
      const res = await fetch('http://localhost:3000/api/clothes');
      const data = await res.json();
      clothes = data.clothes;
    } catch (error) {
      console.error('Failed to fetch clothes:', error);
    }
    
    return {
      props: { clothes },
    };
  }
  
    

const main = ({ clothes }) => {
    const router = useRouter();

    useEffect(() => {
      // Shop 링크를 클릭하여 페이지에 접근했을 때 실행
      if (router.query.scroll === 'shop') {
        window.scrollTo(0, 900);
      }
    }, [router]);
  
  
    return(

        <div>
            <Header></Header>
            <div className={style.Container}>
                <div className={style.LinkImg}>
                    <div className={style.LImg}>
                        <div className={style.Pbox}>
                        <p className={style.BigP1}>B.Dot</p>
                        <p className={style.SmallP1}>2023 new closet</p>
                        </div>
                        <img src="./images/m2.jpg" alt="" />

                    </div>
                    <div className={style.RImg}>
                        <div className={style.Pbox}>
                        <p className={style.BigP2}>BEST</p>
                        <p className={style.SmallP2}>Check out the best-selling <br/>clothes on Bdot</p>
                        </div>
                        <img src="./images/m1jpg.jpg" alt="" />

                    </div>
                    {/* <div className="RImg">
                        <img src="./images/sample2.jpg" alt="" />
                        <div className="Pbox">
                            <p className="BigP">B.Dot2</p>
                            <p className="SmallP">B.Dot2</p>
                        </div>
                    </div> */}



                </div>
                <div className={style.WeeklyBest}>
                    <div className={style.WeeklyHeade}>
                        <h2>WeeklyBest</h2>
                    </div>
                    <div className={style.ClosetBar}>
                    {clothes.map((item) => (
                        <div key={item.ClothesNum} className={style.Closet}>
                        <Link href={`/detail/${Number(item.ClothesNum)}`}>
                           <img src={item.ClothesPicture} alt={item.ClothesName} />
                            <p>{item.ClothesName}</p>
                            <p>{`${item.Price}0원`}</p>
                        </Link>
                        </div>
                    ))}
                    </div>

                </div>
                <div className={style.SB}>
                    <Slider clothes={clothes} ></Slider>
                </div>  
            </div>
            <Footer></Footer>
        </div>
        

    )
}

export default main