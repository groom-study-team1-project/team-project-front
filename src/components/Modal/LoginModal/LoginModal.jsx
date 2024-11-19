import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Btn,
  BtnBox,
  Container,
  Divider,
  Form,
  ModalTitle,
} from "../Modal.style";
import { FormInputField } from "../FormInputField";
import { FindUserBtns, FindUserBtn } from "./LoginModal.style";
import { login } from "../../../services/api/authApi";
import logoImg from "../../../assets/images/DEEPDIVERS.png";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/user/userSlice";
import { ErrMsg } from "../../../assets/styles/ErrMsg.style";
export default function LoginModal({ closeModal, changeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrmsg] = useState("");
  const [errVisible, setErrvisible] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let body = { email, password };
      setErrvisible(true);
      const response = await login(body);
      console.log(response.message);
      if (response.message) {
        setErrmsg(response.message);
      }
      if (response.status.code === 1001) {
        dispatch(
          userLogin({
            accessToken: response.result.accessToken,
            refreshToken: response.result.refreshToken,
          })
        );
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeUserPw = () => {
    changeModal("changeUserPw");
  };

  return (
    <Container>
      <ModalTitle>
        <img src={logoImg} alt="로고 이미지" />
      </ModalTitle>
      <Form action="" method="post" onSubmit={handleLogin}>
        <div className="input-container">
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
        </div>
        {errVisible && <ErrMsg isVibrating={errVisible}>{errMsg}</ErrMsg>}
        <BtnBox>
          <Btn type="submit" id="loginBtn">
            로그인
          </Btn>
        </BtnBox>
        <Divider />

        <FindUserBtns>
          <div>
            <span>비밀번호를 잃어버리셨나요?</span>
            <FindUserBtn onClick={handleChangeUserPw}>
              비밀번호 변경
            </FindUserBtn>
          </div>
        </FindUserBtns>
      </Form>
    </Container>
  );
}
