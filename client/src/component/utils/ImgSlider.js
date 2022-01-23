import React, { useState } from "react";
import "./ImgSlider.css";
import welcome from "../../images/WELCOME.jpg"
import enjoy from'../../images/ENJOY-3.jpg'
import todo from '../../images/TO DO-2.jpg'

export default function ImageSlide() {
 

 const [Images,setImages]=useState(welcome) 
const click = ()=>{
if(Images === welcome){
  setImages(enjoy)
}else if(Images === enjoy){
  setImages(todo)
}else{
  setImages(welcome)
}
} 

  return (
      <img className='imgSlider-background' src={Images} onClick={click}></img>
    // <div className= "img-container">
    // </div>
    );
}