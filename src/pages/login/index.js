import React from "react";
import style from "./Login.module.css"
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";

const LoginPage = () => {


    return(
        <div>
            <Header></Header>
            <div className={style.LoginPage}>
                <div className={style.LoginBox}>
                    <h2>BDOT</h2>
                    <div className={style.LoginForm}>
                        <p className={style.LoginP}>아이디<input type="text" placeholder="ID" /></p>
                        <p className={style.LoginP}>패스워드<input type="text" placeholder="Password" /></p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )

}


export default LoginPage