import React from "react";
import style from './main.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Slider from "../component/Slider/Slider";
import Footer from "../component/Footer/Footer";
import Header from "@/component/Header/Header";
import mysql from 'mysql2/promise';



const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '5475',
    database: 'BDOT'
  };
  
  export async function getServerSideProps(context) {
    let clothes = [];
    try {
        // 데이터베이스에 연결
        const connection = await mysql.createConnection(dbConfig);
        // Clothes 테이블에서 데이터 조회
        const [rows, fields] = await connection.execute('SELECT * FROM Clothes');
        clothes = rows;

        await connection.end();
      } catch (error) {
        console.log(rows[0])
        console.log(product)
        console.error('Database connection or query failed:', error);
        // 에러 처리 로직
      }
    
      // props를 통해 페이지에 데이터 전달
      return {
        props: { clothes }
      };
    }
    

const main = ({ clothes }) => {


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
                    <Slider></Slider>
                </div>  
            </div>
            <Footer></Footer>
        </div>
        

    )
}

export default main