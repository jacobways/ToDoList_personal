import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckPassword, setCHeckPassword] = useState("");
  const [Question, setQuestion] = useState("");
  const IdHandler = (e) => {
    setId(e.target.value);
  };
  let history = useHistory();

  const QuestionHandler = (e) => {
    setQuestion(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const CheckPasswordHandler = (e) => {
    setCHeckPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // register 요청 후 받은 응답을 가지고 redirect
    if (Password !== CheckPassword) {
      alert("비밀번호가 서로 다릅니다");
    } else {
      let body = {
        username: Id,
        password: Password,
        question: Question,
      };
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, body, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          alert("회원가입이 완료되었습니다.");
          history.push("/login");
        });

    }
  };
  const moveLogin = () => {
    history.push("/login");
  };

  return (
    <div className='register-center'>

      <Link to="/">
      <h1 className='register-head'>SBS</h1>

      </Link>
      <div className="register-container" id="container">
        <div className="register-form-container register-sign-in-container">
          <form className="login-form" onSubmit={submitHandler}>
          <h1 className='register-head'>가입을 시작합니다!</h1>

            <div className="register-social-container">{/* Google, kakao auth */}</div>
            <span className = "register-span">아래 내용을 빠짐없이 입력해주세요.</span>
            <input
            className='login'

              required
              type="text"
              value={Id}
              onChange={IdHandler}
              placeholder="아이디"
            />
            <input
            className='login'

              required
              type="password"
              value={Password}
              onChange={PasswordHandler}
              placeholder="비밀번호"
            />
            <input
            className='login'

              required
              type="password"
              value={CheckPassword}
              onChange={CheckPasswordHandler}
              placeholder="비밀번호 확인"
            />
            <input
            className='login'

              required
              type="text"
              value={Question}
              onChange={QuestionHandler}
              placeholder="졸업한 초등학교는?"
            />
            <span className="register-span">
              위 질문은 비밀번호를 잊어버렸을 경우 사용 됩니다.
            </span>
            <button className="login-btn" type="submit">회원가입</button>
          </form>
        </div>
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-right">
              <h1 className='login-h1'>안녕하세요! 반가워요!</h1>
              <p className ="login-p">사용 중인 아이디가 있다면,아래 버튼을 눌러주세요.</p>
              <button className="ghost login-btn" id="signUp" onClick={moveLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;