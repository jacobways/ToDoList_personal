import React, { useState, useEffect } from "react";
import axios from "axios";

function Theme({ AccessToken, UserId, changeListHandler }) {
  const [ThemeColor, setThemeColor] = useState([]);
  const [ThemeStatus, setThemeStatus] = useState(false);
  const [ThemeName, setThemeName] = useState([]);
  const [Name, setName] = useState("");
  const [Color, setColor] = useState("");
  const [Token, setToken] = useState(AccessToken);
  const [ThemeEditModalStatus, setThemeEditModalStatus] = useState(false);

  const [UsersId, setUsersId] = useState(UserId);
  const [EditName, setEditName] = useState("");
  const [EditColor, setEditColor] = useState("");
  const [DefaultName, setDefaultName] = useState("");

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
        setUsersId(res.data.userInfo.id);
        console.log(res);
      });
  }, []);

  // 테마 한개가 추가될때
  useEffect(() => {
    if (UsersId !== 0) {
      console.log(UsersId);
      axios.get(`https://localhost:5000/allTheme/${UsersId}`).then(res => {
        if (res.data.allTheme[res.data.allTheme.length - 1]) {
          console.log(res.data.allTheme);
          let newThemeColor = [...ThemeColor];
          newThemeColor.push(
            res.data.allTheme[res.data.allTheme.length - 1].color
          );
          setThemeColor(newThemeColor);

          let newThemeName = [...ThemeName];
          newThemeName.push(
            res.data.allTheme[res.data.allTheme.length - 1].name
          );
          setThemeName(newThemeName);
          changeListHandler();
        }
      });
    }
  }, [ThemeStatus, UsersId]);

  // 처음 렌더링될때 테마 DB에서 가져오기
  useEffect(() => {
    if (UsersId !== 0) {
      axios.get(`https://localhost:5000/allTheme/${UsersId}`).then(res => {
        console.log(res.data.allTheme);
        let newThemeColor = [...ThemeColor];
        res.data.allTheme.forEach(theme => {
          newThemeColor.push(theme.color);
        });
        setThemeColor(newThemeColor);

        let newThemeName = [...ThemeName];
        res.data.allTheme.forEach(theme => {
          newThemeName.push(theme.name);
        });
        setThemeName(newThemeName);
      });
    }

    axios
      .get(
        "https://localhost:5000/time",
        { params: { theme: ThemeName, userId: UsersId } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(res => {
        console.log(res);
        // 해당 데이터를 불러온후 start TIme, End Time을 통해 구한 시간을 pie Chart에 적용
      })
      .catch(err => {
        console.log(err);
      });
  }, [UsersId]);

  const submitHandler = e => {
    e.preventDefault();
    // let newThemeColor = [...ThemeColor];
    // newThemeColor.push(Color);
    // setThemeColor(newThemeColor);

    // let newThemeName = [...ThemeName];
    // newThemeName.push(Name);
    // setThemeName(newThemeName);

    let body = {
      userId: UsersId,
      name: Name,
      color: Color,
    };
    console.log(body);
    axios.post("https://localhost:5000/theme", body).then(res => {
      console.log(res.data);
      setThemeStatus(!ThemeStatus);
    });
  };
  const ColorHandler = e => {
    // console.log(e.target.value);
    setColor(e.target.value);
  };

  const NameHandler = e => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const ThemeEditHandler = name => {
    axios
      .get(`https://localhost:5000/getTheme/${name}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.editTheme);
        setDefaultName(res.data.editTheme.name);
      });

    setThemeEditModalStatus(!ThemeEditModalStatus);
  };

  const EditNameHandler = e => {
    setEditName(e.target.value);
  };
  const EditColorHandler = e => {
    setEditColor(e.target.value);
  };

  const updateThemeHandler = () => {
    console.log("초기 name", DefaultName);
    console.log("업데이트 name", EditName);
    console.log("업데이트 Color", EditColor);

    let data = {
      defaultname: DefaultName,
      editname: EditName,
      editcolor: EditColor,
    };

    axios
      .patch("https://localhost:5000/updateTheme", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => {
        setThemeStatus(!ThemeStatus);
        changeListHandler();

        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteHandler = () => {
    axios
      .delete(
        "https://localhost:5000/deletetheme",
        { params: { name: DefaultName } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(res => {
        setThemeStatus(!ThemeStatus);
        changeListHandler();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3 className="sleepy">
          테마 변경 : 본인이 원하는 색상을 선택하여 테마를 만들어 보세요
        </h3>
        <div className="nogada" style={{ display: "flex" }}>
          <form onSubmit={submitHandler} style={{ marginRight: "15rem" }}>
            <input
              style={{
                width: "3rem",
                height: "2rem",
                padding: "0.2rem",
                backgroundColor: "grey",
                marginRight: "1rem",
              }}
              type="color"
              onChange={ColorHandler}
              value={Color}
            />
            <input
              className="theme-input"
              type="text"
              value={Name}
              onChange={NameHandler}
              placeholder="테마 이름을 적어주세요."
            />
            <button className="theme-btn" type="submit">
              만들기
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {ThemeColor.map((color, index) => {
          return (
            <div
              style={{
                border: "1px solid #DFDDDC",
                margin: "1rem",
              }}
            >
              <div
                onClick={e => {
                  ThemeEditHandler(e.target.innerHTML);
                }}
                key={index}
                style={{
                  backgroundColor: color,
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  margin: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "600",
                }}
              >
                {ThemeName[index]}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0.5rem",
                }}
              >
                <span style={{ color: color }}>Theme {index}</span>
              </div>
            </div>
          );
        })}
        <br />
        {ThemeEditModalStatus ? (
          <form>
            <label>Name</label>
            <input
              type="text"
              placeholder={DefaultName}
              value={EditName}
              onChange={EditNameHandler}
            />
            <label>Color</label>
            <input
              style={{
                width: "3rem",
                height: "2rem",
                padding: "0.2rem",
                backgroundColor: "grey",
                marginRight: "1rem",
              }}
              type="color"
              value={EditColor}
              onChange={EditColorHandler}
            />
            <button onClick={deleteHandler} type="submit">
              삭제
            </button>
            <button onClick={updateThemeHandler} type="submit">
              변경
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default Theme;
