import {
  Btn,
  BtnBox,
  Container,
  Divider,
  Form,
  ModalTitle,
} from "../../Modal.style";
import PinCodeInput from "../../../Common/PinCodeInput/PinCodeInput";
import { useState } from "react";

function VerificationCodeInputForm({ email, handlePrev, handleNext }) {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <Container>
      <ModalTitle>
        <h1>인증코드 입력</h1>
      </ModalTitle>
      <p>
        {email}으로 전송된 6자리 인증코드를 입력 후 [다음] 버튼을 클릭해주세요
      </p>
      <Form onSubmit={handleSubmit}>
        <PinCodeInput setVerificationCode={setVerificationCode} />

        <Divider />
        <BtnBox>
          <Btn onClick={handlePrev}>이전</Btn>
          <Btn type="submit">다음</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default VerificationCodeInputForm;
