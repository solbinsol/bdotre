// import React from "react"
import style from "./Header.module.css"
import Link from "next/link"
const Header = () =>{

    return(
        <div className={style.header}>
                <div className={style.Logo}>
                    <Link href="/"><h1>B.dot</h1></Link>
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
                            <li>shipping</li>
                            <Link href="/login"><li>Login/SigunUp</li></Link>
                        </ul>
                </div >
                
        </div>
    )
}


export default Header

