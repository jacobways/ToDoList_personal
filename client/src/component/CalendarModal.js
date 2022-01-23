import { useState } from "react";
import PickDate from "./PickDate";

import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  height: 1rem;
  text-align: center;
  margin: 12px auto;
`;

export const ModalBtn = styled.button`
  background-color: #fe2790;
  text-decoration: none;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  opacity: 0.8;
  font-size: 1em;
`;

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 300px;
  height: 100px;
  > div.close_btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

function CalendarModal({ setDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen === false ? "Calendar" : "Change"}
        </ModalBtn>
        {isOpen === true ? (
          <ModalBackdrop>
            <PickDate setSimpleDate={setDate} />
            <button className="create-btn" onClick={openModalHandler}>
              날짜 변경 완료
            </button>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
}

export default CalendarModal;
