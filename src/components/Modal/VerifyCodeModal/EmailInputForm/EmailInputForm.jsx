import { useState } from "react";
import { FormInputField } from "../../FormInputField";
import {
  Btn,
  BtnBox,
  Container,
  Divider,
  Form,
  ModalTitle,
} from "../../Modal.style";
import { ErrorMsg } from "../../SignUpModal/SignUpModal.style";
import {
  sendEmailVerificationCode,
  sendEmailVerificationCodePassword,
} from "../../../../services/api/authApi";

function EmailInputForm({ handleNext, handleSubmitEmail, sendEmail }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let err = "";

    if (email.length < 1) {
      err = "이메일 주소를 입력해주세요.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      err = "유효한 이메일 주소를 입력해주세요.";
    }

    setError(err);
    return err.length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const isValid = validateForm();

      if (isValid) {
        let body = { email };

        const { success, message } =
          sendEmail === "email"
            ? await sendEmailVerificationCode(body)
            : await sendEmailVerificationCodePassword(body);

        if (!success) {
          setError(message);
          return;
        }

        handleNext();
        handleSubmitEmail(email);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <ModalTitle>
        <h1>회원가입</h1>
      </ModalTitle>
      <p>이메일을 입력해주세요</p>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <FormInputField
            label={"이메일"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </div>

        <Divider />
        <BtnBox>
          <Btn type="submit">계정 생성하기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default EmailInputForm;
