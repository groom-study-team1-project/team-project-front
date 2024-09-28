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
import { ErrorMsg } from "../SignUpModal.style";
import { checkDuplicatedEmail } from "../../../../services/api/authApi";

function EmailInputForm({ handleNext, handleSubmitEmail }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    let errors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    if (await checkDuplicatedEmail(email)) {
      errors.email = "중복된 이메일 주소입니다.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      handleNext();
      handleSubmitEmail(email);
    }
  };

  return (
    <Container>
      <ModalTitle>
        <h1>회원가입</h1>
      </ModalTitle>
      <p>이메일을 입력해주세요</p>
      <Form onSubmit={handleSubmit}>
        <FormInputField
          label={"이메일"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

        <Divider />
        <BtnBox>
          <Btn type="submit">계정 생성하기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default EmailInputForm;
