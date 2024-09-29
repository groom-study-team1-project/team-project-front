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
import { ErrorMsg, ProfileImgDiv } from "../SignUpModal.style";
import {
  checkDuplicatedNickname,
  signUp,
  uploadProfileImage,
} from "../../../../services/api/authApi";
import profileIcon from "../../../../assets/images/profileIcon.png";

function UserDetailsInputForm({ email, handlePrev, changeModal }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    let errors = {};

    if (nickname.length < 2 || nickname.length > 20) {
      errors.nickname = "닉네임은 2글자부터 20글자까지 가능합니다.";
    }

    if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname)) {
      errors.nickname =
        "닉네임은 영어 대소문자, 한글, 숫자의 조합이어야 합니다.";
    }

    if (await checkDuplicatedNickname(nickname)) {
      errors.nickname = "중복된 닉네임입니다.";
    }

    if (password.length < 8 || password.length > 16) {
      errors.password = "비밀번호는 8글자 이상 16글자 이하이어야 합니다.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber)) {
      errors.phoneNumber = "전화번호 형식을 맞춰주세요. 예: 010-0000-0000";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImageAndGetUrl = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profileImg);

      const response = await uploadProfileImage(formData);
      return response.imageUrl;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      return null;
    }
  };

  async function handleSignUp(e) {
    e.preventDefault();

    const isValid = await validateForm();

    if (isValid) {
      try {
        const profileImgUrl = await uploadImageAndGetUrl();

        let body = {
          email,
          password,
          nickname,
          imageUrl: profileImgUrl,
          phoneNumber,
        };

        const response = await signUp(body);
        console.log(response);

        changeModal("login");
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <Container>
      <ModalTitle>
        <h1>회원가입</h1>
      </ModalTitle>
      <Form onSubmit={handleSignUp}>
        <ProfileImgDiv>
          <img
            src={previewImage ? previewImage : profileIcon}
            alt="프로필사진"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </ProfileImgDiv>
        <div>
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            hasError={errors.nickname}
          />
          {errors.nickname && <ErrorMsg>{errors.nickname}</ErrorMsg>}
        </div>

        <div>
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={errors.password}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </div>
        <div>
          <FormInputField
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
          )}
        </div>
        <div>
          <FormInputField
            label={"휴대폰 번호"}
            type={"phoneNumber"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            hasError={errors.phoneNumber}
          />
          {errors.phoneNumber && <ErrorMsg>{errors.phoneNumber}</ErrorMsg>}
        </div>

        <Divider />
        <BtnBox>
          <Btn onClick={handlePrev}>이전</Btn>
          <Btn type="submit">계정 생성하기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default UserDetailsInputForm;
