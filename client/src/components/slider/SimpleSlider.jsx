// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./slick-theme.css";
import "./slick.css";
import React from "react";
import Slider from "react-slick";
import Banner1 from "./Banner1.jsx";
import Banner2 from "./Banner2.jsx";
import Banner3 from "./Banner3.jsx";
import Banner4 from "./Banner4.jsx";
import Banner5 from "./Banner5.jsx";


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="slider-banner">
      <Slider {...settings}>
        <div>
          <Banner1 />
        </div>
        <div>
          <Banner2 />
        </div>
        <div>
          <Banner3 />
        </div>
        <div>
          <Banner4 />
        </div>
        <div>
          <Banner5 />
        </div>
      </Slider>
    </div>
  );
}