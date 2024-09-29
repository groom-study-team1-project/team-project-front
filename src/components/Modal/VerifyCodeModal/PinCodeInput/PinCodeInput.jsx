import React, { useState, useRef } from "react";
import { PinInput, PinInputWrapper } from "./PinCodeInput.style";

const PinCodeInput = ({ pinLength = 6, setVerifyCode }) => {
  const [pinValues, setPinValues] = useState(Array(pinLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]$/.test(value)) return;

    const newPinValues = [...pinValues];
    newPinValues[index] = value;

    setPinValues(newPinValues);

    if (index < pinLength - 1 && value) {
      inputRefs.current[index + 1].focus();
    }
    if (newPinValues.every((pin) => pin !== "")) {
      setVerifyCode(newPinValues.join(""));
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0) {
      const newPinValues = [...pinValues];
      newPinValues[index] = "";
      setPinValues(newPinValues);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <PinInputWrapper>
      {pinValues.map((value, index) => (
        <PinInput
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleBackspace(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
          autoFocus={index === 0}
        />
      ))}
    </PinInputWrapper>
  );
};

export default PinCodeInput;
