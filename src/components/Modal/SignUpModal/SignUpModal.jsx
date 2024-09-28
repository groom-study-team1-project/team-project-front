import React, { useState } from "react";
import EmailInputForm from "./EmailInputForm/EmailInputForm";
import VerificationCodeInputForm from "./VerificationCodeInputForm/VerificationCodeInputForm";
import UserDetailsInputForm from "./UserDetailsInputForm/UserDetailsInputForm";

export default function SignUpModal() {
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
      {SignupSteps[step] === "email" ? (
        <EmailInputForm
          handleNext={handleNext}
          handleSubmitEmail={handleSubmitEmail}
        />
      ) : SignupSteps[step] === "verificationCode" ? (
        <VerificationCodeInputForm
          email={email}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      ) : (
        <UserDetailsInputForm email={email} handlePrev={handlePrev} />
      )}
    </>
  );
}
