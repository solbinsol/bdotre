import React, { Component } from "react";
import Slider from "react-slick";
import Link from "next/link";
import style from './Slider.module.css';


export default class Resizable extends Component {
  state = {
    display: true,
    width: 100,
    height:600,

  };

  renderSlides() {
    const { clothes } = this.props;
    if (!clothes) {
      return <p>No clothes data available.</p>; // 또는 return null; 또는 return []; 등
    }
    // clothes 배열을 이용하여 슬라이더 아이템을 동적으로 렌더링합니다.
    return clothes.map((cloth, index) => (
      <div key={index} className={style.SlidItem}>
        <Link href={`/detail/${cloth.ClothesNum}`}>
          <img src={cloth.ClothesPicture} alt={cloth.ClothesName} />
        </Link>
      </div>
    ));
  }




  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true, // 자동 재생 활성화
      autoplaySpeed: 2000, // 2초마다 슬라이드
    };
    
    return (
      <div className={style.Slid}>
        <h2 className={style.MidH}>Resizable Collapsible</h2>
        <div
          className={style.BBox}
          style={{
            width: this.state.width + "%",
            height: this.state.height + "px",
            display: this.state.display ? "block" : "none",
          }}
        >
          <Slider {...settings}>
            {this.renderSlides()} {/* 슬라이더 아이템을 렌더링하는 메소드를 호출합니다 */}
          </Slider>
        </div>
        <div className={style.Footer}></div>
      </div>
    );
  }
}
