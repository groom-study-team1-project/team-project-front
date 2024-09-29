import React, { useState } from "react";
import PwInputForm from "./PwInputForm/PwInputForm";
import EmailInputForm from "../VerifyCodeModal/EmailInputForm/EmailInputForm";
import VerificationCodeInputForm from "../VerifyCodeModal/VerificationCodeInputForm/VerificationCodeInputForm";

export default function ChangeUserPw({ changeModal }) {
  const [email, setEmail] = useState("");
  const [step, setIndexStep] = useState(0);
  const ChangePwSteps = ["email", "verificationCode", "password"];

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
      {ChangePwSteps[step] === "email" ? (
        <EmailInputForm
          handleNext={handleNext}
          handleSubmitEmail={handleSubmitEmail}
          sendEmail="password"
        />
      ) : ChangePwSteps[step] === "verificationCode" ? (
        <VerificationCodeInputForm
          email={email}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      ) : (
        <PwInputForm
          email={email}
          handlePrev={handlePrev}
          changeModal={changeModal}
        />
      )}
    </>
  );
}
