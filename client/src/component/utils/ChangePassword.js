import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ChangePassword({ AccessToken }) {
  const [Question, setQuestion] = useState("");
  const [Token, setToken] = useState("");
  const [UserInfo, setUserInfo] = useState({});
  const [ChangePasswordModal, setChangePasswordModal] = useState(false);
  const [NewPassword, setNewPassword] = useState(0);

  let history = useHistory();
  useEffect(() => {
    setToken(AccessToken);
    // console.log(AccessToken);
    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
    axios
      .post(
        "https://localhost:5000/user",
        {
          headers: {
            Cookie: `token=${Token}`,
          },
        },
        { withCredentials: true }
      )
      .then(res => {
        // console.log(res.data);
        setUserInfo(res.data.userInfo);
      });
  }, []);

  const QuestionHandler = e => {
    setQuestion(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (UserInfo.question !== Question) {
      alert("질문의 답이 올바르지 않습니다.");
    } else {
      setChangePasswordModal(true);
    }

    //   Db에서 해당 로그인한 사람의 id에 맞는 question을 가져온다

    // 입력한 question과 db의 quesiotn이 같은지 확인후 같으면 password 변겨 Modal을 띄운다
  };
  const NewPasswordHandler = e => {
    setNewPassword(e.target.value);
  };
  const ChangePasswordHandler = e => {
    e.preventDefault();
    // console.log(NewPassword);
    let body = {
      userId: UserInfo.id,
      password: NewPassword,
    };
    axios
      .post("https://localhost:5000/changepassword", body, {
        withCredentials: true,
      })
      .then(res => {
        // console.log(res.data);
        if (res.data.message) {
          history.push("/login");
        }
      });
  };

  return (
    <div>
      <form class="tired" onSubmit={submitHandler}>
        <h1 className="sosleepy">
          비밀번호를 변경하고 싶으시면 회원가입때 작성하신 질문에 답변해주세요.
        </h1>
        <input
          required
          type="text"
          value={Question}
          onChange={QuestionHandler}
          placeholder="졸업한 초등학교는?"
        />
        <button type="submit">확인</button>
      </form>
      {ChangePasswordModal ? (
        <form class="sotired" onSubmit={ChangePasswordHandler}>
          <input
            required
            type="password"
            value={NewPassword}
            onChange={NewPasswordHandler}
            placeholder="새로 변경하실 비밀번호를 입력하세요"
          />
          <button type="submit">확인</button>
        </form>
      ) : null}
    </div>
  );
}

export default ChangePassword;
