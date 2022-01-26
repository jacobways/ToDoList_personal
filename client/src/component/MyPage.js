import React, { useState } from "react";
import ChangePassword from "./utils/ChangePassword";
import Theme from "./utils/Theme";

function MyPage({ AccessToken, UserId }) {
  const [changeList, setChangeList] = useState(false);

  const changeListHandler = () => {
    // useEffect를 통해 list가 CRUD로 변경될 시 화면에 업데이트 시켜주기 위함
    setChangeList(!changeList);
  };
  return (
    <div>
      {/* 비밀번호 변경 */}
      <div className='login-center'>
      <div className="login-container" id="container">


      <ChangePassword AccessToken={AccessToken} />
      {/* 테마 변경 */}
      <br />
      <br />
      <Theme
        changeListHandler={changeListHandler}
        AccessToken={AccessToken}
        UserId={UserId}
      />
    </div></div></div>
  );
}

export default MyPage;