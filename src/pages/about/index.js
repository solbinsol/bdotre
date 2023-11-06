import React from "react";
import style from "./about.module.css";
import Header from "@/component/Header/Header";
import Footer from "@/component/Footer/Footer";

const AboutPage=()=>{

    return(
        <div>
            <Header></Header>
            <div className={style.AboutPage}>
                
                <div className={style.About}>
                <h1>B.dot</h1>

                    <h2>"that anyone can wear"</h2>
                    <p className={style.h2Span}>"누구나 입을 수 있는"</p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default AboutPage