import React from "react";
import style from './main.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Slider from "../component/Slider/Slider";
import Footer from "../component/Footer/Footer";
import Header from "@/component/Header/Header";
const main = () =>{

    return(

        <div>
            <Header></Header>
            <div className={style.Container}>
                <div className={style.LinkImg}>
                    <div className={style.LImg}>
                        <div className={style.Pbox}>
                        <p className={style.BigP1}>B.Dot1</p>
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
                        <div className={style.Closet}>
                            <Link href="/detail1"><img src="images/1.jpg" alt="s" />
                            <p>시어서커 체크 셔츠 3c</p><p>45,600</p></Link>
                        </div>
                        <div className={style.Closet}>
                        <Link href="/detail2"><img src="images/2.jpg" alt="ss" />
                            <p>로고 플레이 비니</p><p>19,000원</p></Link>
                        </div>
                        <div className={style.Closet}>
                        <Link href="/detail3"><img src="images/3.jpg" alt="sss" />
                            <p>로즈 디지털 프린팅 반팔 2c</p><p>23,000원</p></Link>
                        </div>
                        <div className={style.Closet}>
                        <Link href="/detail4"><img src="images/4.jpg" alt="sswws" />
                            <p>크랙 믹시드 레더 자켓 </p><p>93,500</p></Link>
                        </div>

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