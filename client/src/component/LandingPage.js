import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import Slider from "./utils/Slider";
import ImageSlide from "./utils/ImgSlider";
import images from "./images"
import "./LandingPage.css"

function LandingPage({ AccessToken }) {
  const [Token, setToken] = useState("");
  const [UserName, setUserName] = useState("");
  const [AllUser, setAllUser] = useState(0);
  const [Images, setImages] = useState(images[0].src)

  const a =()=>{
    setImages(images[0].src)
  }
  const b =()=>{
  setImages(images[1].src)
  }
  const c =()=>{
  setImages(images[2].src)
  }






  useEffect(() => {
    setToken(AccessToken);

    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/user`,
        {
          headers: {
            Cookie: `token=${Token}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUserName(res.data.userInfo.username);
      });

    axios.get(`${process.env.REACT_APP_SERVER_URL}/alluser`).then((res) => {
      setAllUser(res.data.allUser);
    });
  }, [UserName]);

  return (
    <>
    <div className="landingPage-section" >
      <div className='landingPage-section-header'>
        <Link to='/'>
          <p className='landingPage-time'>SBS</p>
        </Link>
        <Link to='/mypage'>
          <p className='landingPage-time'>
            {UserName}님 반갑습니다!
          </p>
        </Link>
      </div>
        <ImageSlide/>
        <Slider />
      <div className = "landingPage-explanation-container">
        <ul className='landingPage-explanation'>
          <div className='landingPage-clickchange'>
            아래 버튼을 눌러 기능을 확인해 보세요!
          </div>
          <li className='landingPage-buttonfor'>
            <span className="landingPage-span" onClick={a}>TODO</span>
          </li>
          <li className='landingPage-buttonfor'>
            <span className="landingPage-span" onClick={b}>NOT TO DO</span>
          </li>
          <li className='landingPage-buttonfor'>
            <span className="landingPage-span" onClick={c}>LIST</span>
          </li>
        </ul>   
        <img className='landingPage-img' src={Images} />
      </div>
    </div> 
  </> 
  );
}

export default LandingPage;
