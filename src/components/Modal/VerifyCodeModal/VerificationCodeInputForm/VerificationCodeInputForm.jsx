import {
  Btn,
  BtnBox,
  Container,
  Divider,
  Form,
  ModalTitle,
} from "../../Modal.style";
import PinCodeInput from "../PinCodeInput/PinCodeInput";
import { useState } from "react";
import { verifyEmailCode } from "../../../../services/api/authApi";
import { ErrorMsg } from "../../SignUpModal/SignUpModal.style";

function VerifyCodeInputForm({ email, handlePrev, handleNext }) {
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let body = { email, verifyCode };

      const isVerify = await verifyEmailCode(body);

      if (isVerify) {
        handleNext();
      }
    } catch (err) {
      setError("유효하지 않은 인증코드 입니다.");
    }
  }

  return (
    <Container>
      <ModalTitle>
        <h1>인증코드 입력</h1>
      </ModalTitle>
      <p>
        {email}으로 전송된 6자리 인증코드를 입력 후 [다음] 버튼을 클릭해주세요
      </p>
      <Form onSubmit={handleSubmit}>
        <div>
          <PinCodeInput setVerifyCode={setVerifyCode} />
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </div>
        <Divider />
        <BtnBox>
          <Btn onClick={handlePrev}>이전</Btn>
          <Btn type="submit">다음</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default VerifyCodeInputForm;
