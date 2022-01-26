import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ TokenSave }) {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [AccessToken, setAccessToken] = useState("");
  let history = useHistory();

  const IdHandler = (e) => {
    setId(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    // console.log(AccessToken);--
  }, [AccessToken]);
  const submitHandler = (e) => {
    e.preventDefault();
    // login 요청 후 받은 응답을 가지고 로그인 상태 설정 후 렌더링 다시해주기
    // 로그인 상태에 따른 렌더링 -> 렌더링 페이지에서 상태에 따라 보여주기?
    // 렌더링 1 : 로그인 안된 모습(김명현,장동혁)
    // 렌더링 2 : 로그인 된 모습(김지윤,홍민혁)
    let body = {
      username: Id,
      password: Password,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setAccessToken(res.data.data.token);
        TokenSave(res.data.data.token);
        history.push("/");
      });
  };
  const moveRegister = () => {
    history.push("/register");
  };
  return (
    <div className='login-center'>

      <Link to="/">
      <h1 className='login-head'>SBS</h1>
      </Link>
      <div className="login-container" id="container">
        <div className="login-form-container login-sign-in-container">
          <form className="login-form" onSubmit={submitHandler}>
            <h1>환영합니다!</h1>

            <div className="login-social-container"></div>
            <span></span>
            <input
            className='login'

              type="text"
              value={Id}
              onChange={IdHandler}
              placeholder="아이디"
            />
            <input
            className='login'

              type="password"
              value={Password}
              onChange={PasswordHandler}
              placeholder="비밀번호"
            />
            <Link to="/forgotpage">비밀번호를 잊어버리셨나요?</Link>
            <button className ="login-btn"type="submit">로그인</button>
          </form>
        </div>
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-right">
              <h1 className="login-h1">안녕하세요! 반가워요!</h1>
              <p className="login-p">아이디가 없으시다면 아래 버튼을 눌러주세요!</p>
              <button className="ghost login-btn" id="signUp" onClick={moveRegister}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
