import React from "react";
import style from "./Footer.module.css";


const Footer = () => {


    return(

<           div className={style.footer}>
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


    )
}

export default Footer;