import React, { useState } from "react";
import Slide from "./Slide";
import "./Slider.css";

const TOTAL_SLIDES = 4;
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="slider-center">
      <Slide id={currentSlide} />
      <div className="acenter">
        <button className="slide-Btn" onClick={prevSlide}>
          Previous Slide
        </button>
        <button className="slide-Btn" onClick={nextSlide}>
          Next Slide
        </button>
      </div>
    </div>
  );
}
