import React, { useState } from "react";
import EmailInputForm from "../VerifyCodeModal/EmailInputForm/EmailInputForm";
import VerificationCodeInputForm from "../VerifyCodeModal/VerificationCodeInputForm/VerificationCodeInputForm";
import UserDetailsInputForm from "./UserDetailsInputForm/UserDetailsInputForm";
import GlobalStyle from "../../../assets/styles/GlobalStyle";

export default function SignUpModal({ changeModal, closeModal }) {
  const [email, setEmail] = useState("");
  const [step, setIndexStep] = useState(0);
  const SignupSteps = ["email", "verificationCode", "detail"];

  const handleNext = () => {
    setIndexStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIndexStep((prev) => prev - 1);
  };

  const handleSubmitEmail = (email) => {
    setEmail(email);
  };

  return (
    <>
      <GlobalStyle />
      {SignupSteps[step] === "email" ? (
        <EmailInputForm
          handleNext={handleNext}
          handleSubmitEmail={handleSubmitEmail}
          sendEmail="email"
        />
      ) : SignupSteps[step] === "verificationCode" ? (
        <VerificationCodeInputForm
          email={email}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      ) : (
        <UserDetailsInputForm
          email={email}
          closeModal={closeModal}
          changeModal={changeModal}
        />
      )}
    </>
  );
}
