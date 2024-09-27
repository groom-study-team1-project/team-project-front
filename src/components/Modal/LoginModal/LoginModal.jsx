import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Container, Divider, Form, Logo } from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserBtns, FindUserBtn } from "./LoginModal.style";
import { login } from "../../../services/authApi";
import logoImg from "../../../assets/images/DEEPDIVERS.png";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/user/userSlice";

export default function LoginModal({ closeModal, changeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      let body = { email, password };

      const { accessToken, refreshToken } = await login(body);

      dispatch(userLogin({ accessToken: accessToken }));
      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  const handleFindUserId = () => {
    changeModal("findUserId");
  };

  const handleFindUserPw = () => {
    changeModal("findUserPw");
  };

  return (
    <Container width="496px" height="628px">
      <Logo>
        {/* 임시로 로고이미지 지정해놓음 */}
        <img src={logoImg} alt="로고 이미지" style={{ width: "288px" }} />
      </Logo>
      <Form action="" method="post" onSubmit={handleLogin}>
        <FormInputField
          label={"이메일"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInputField
          label={"비밀번호"}
          type={"password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
        />

        <Btn type="submit" id="loginBtn">
          로그인
        </Btn>
        <Divider width="80%" />

        <div className="btns">
          <FindUserBtns>
            <div>
              <span style={{ fontSize: "14px" }}>아이디를 잃어버리셨나요?</span>
              <FindUserBtn onClick={handleFindUserId}>아이디 찾기</FindUserBtn>
            </div>
            <div>
              <span style={{ fontSize: "14px" }}>
                비밀번호를 잃어버리셨나요?
              </span>
              <FindUserBtn onClick={handleFindUserPw}>
                비밀번호 찾기
              </FindUserBtn>
            </div>
          </FindUserBtns>
        </div>
      </Form>
    </Container>
  );
}
