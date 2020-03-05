import React from "react";
import Slider from "react-slick";
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: "#0de7f5",
        top: "50%",
        right: "5px",
        left: "auto",
        zIndex: "1",
        opacity: 0
      }}
      onClick={onClick}
    >
      <i
        className="fa fa-angle-right"
        style={{ fontSize: "20px", color: "#ffffff" }}
      ></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: "#0de7f5",
        top: "50%",
        left: "5px",
        right: "auto",
        zIndex: "1",
        opacity: 0
      }}
      onClick={onClick}
    >
      <i
        className="fa fa-angle-left"
        style={{ fontSize: "20px", color: "#ffffff" }}
      ></i>
    </div>
  );
}
const Gellary = props => {
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    infinite: true,
    speed: 400,
    autoplaySpeed: 3000,
    cssEase: "linear",
    dragable: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };



  return (
    <Slider {...settings}>
     
      {props.imageUrl.map((item, index) => {
        let count = index + 1;
        
        if(index != 0) return (
          <div className={`item ${count == 1 ? "active" : ""}`} key={index}>
            <img src={item} />
          </div>
        );
      })}
    </Slider>
  );
};
export default Gellary;
