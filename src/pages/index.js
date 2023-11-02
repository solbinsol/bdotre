import React from "react";
import style from './main.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Slider from "../component/Slider/Slider";
const main = () =>{

    return(

        <div>
            <div className={style.header}>
                <div className={style.Logo}>
                    <Link href="/"><h1>B.Dot</h1></Link>
                </div>
                <div className={style.Menu}>
                    <div  className={style.LMenu}>
                        <ul>
                            <li>ABOUT BRAND</li>
                            <li>SHOP</li>
                            <li>CUSTOM SERVICE</li>
                            <li>MY PAGE</li>
                        </ul>
                    </div>
                </div>
                <div  className={style.RMenu}>
                        <ul>
                            <li>ABOUT BRAND</li>
                            <li>SHOP</li>
                            <li>CUSTOM SERVICE</li>
                            <li>MY PAGE</li>
                        </ul>
                    </div >
            </div>
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
                        <h1>WeeklyBest</h1>
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
                    <h2 className={style.MidH}> Resizable Collapsible </h2>

                </div>
                <div className={style.SB}>
                    <Slider></Slider>
                </div>  
            </div>
            <div className={style.footer}>
                <div className={style.Fitem}>
                  <div className={style.Lfooter}>
                        <ul className={style.ListAll}>
                            <ul className={style.List}><div className={style.S}>HELP</div>
                                <li>Guid</li>
                                <li>Privacy</li>
                            </ul>
                            <ul className={style.List}><div className={style.S}>SOCIAL</div>
                                <li>Facebook</li>
                                <li>Instargam</li>
                            </ul>
                        </ul>
                    </div>
                    <div className={style.Fjoin}>
                        <h4>Join Us</h4>
                        <p>회원을 위한 다양한 혜태기 준비되어 있습니다. </p>
                        <p>Sign Up now enjoy convenient features and benefits.</p>
                        <input className={style.Btn} type="submit" value="JOIN US"/>
                        <br/>

                    </div>
                    <div className={style.Rfooter}>
                        <h4>OUR STORE</h4>
                        <p>AM - 10:00 - PM - 6:00 </p>
                        <p>주식회사 비닷 / 이정훈</p>
                        <p>경기도 수원시 권선구 효탑로 16번길 35 , 602호</p>
                        <br/>
                        <p>qkaejwnj@naver.com</p>
                        <p>010-6286-7011</p>
                    </div>

                    </div>
                </div>
        </div>
        

    )
}

export default main