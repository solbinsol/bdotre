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
  render() {
    const settings = {

      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true,
    };
    return (
      <div className={style.Slid}>
                    <h2 className={style.MidH}> Resizable Collapsible </h2>


        <div className={style.BBox}
          style={{
            width: this.state.width + "%",
            height: this.state.height + "px",
            display: this.state.display ? "block" : "none"
          }}
        >
          
          <Slider {...settings}>
            <div className={style.SlidItem}>
                <Link href="detail1"><img src="./images/1.jpg" alt="ss" /></Link>
            </div  >
            <div className={style.SlidItem}>
            <Link href="detail2"><img src="./images/2.jpg" alt="ss" /></Link>
            </div>
            <div className={style.SlidItem}>
            <Link href="detail3"><img src="./images/3.jpg" alt="ss" /></Link>
            </div>
            <div className={style.SlidItem}>
            <Link href="detail4"><img src="./images/4.jpg" alt="ss" /></Link>
            </div>

          </Slider>
        </div>
        <div className={style.Footer}>
            
        </div>
      </div>
    );
  }
}
