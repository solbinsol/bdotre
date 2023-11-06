// import React from "react"
import style from "./Header.module.css"
import Link from "next/link"
import { useState ,useEffect } from "react";
import { useRouter } from 'next/router';


const Header = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지를 체크하여 로그인 상태를 설정
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
      }, []);

      const handleLogout = () => {
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
        setIsLoggedIn(false); // 로그인 상태 업데이트
        router.push('/'); // 홈페이지로 리다이렉트
      };

    return(
        <div className={style.header}>
                <div className={style.Logo}>
                    <Link href="/"><h1>B.dot</h1></Link>
                </div>
                <div className={style.Menu}>
                    <div  className={style.LMenu}>
                        <ul>
                            <Link href="/about"><li>ABOUT BRAND</li></Link>
                            <Link href="/?scroll=shop">
                            <li>SHOP</li>
                            </Link>
                            <Link href="/notice"><li>NOTICE</li></Link>
                            <Link href="/mypage"><li>MY PAGE</li></Link>
                        </ul>
                    </div>
                </div>
                
                <div  className={style.RMenu}>
                        <ul>
                            <li>shipping</li>
                            {isLoggedIn ? (
                                <li onClick={handleLogout}>Logout</li>
                            ) : (
                                <Link href="/login"><li>Login</li></Link>
                            )}
                        </ul>
                </div >
                
        </div>
    )
}


export default Header

