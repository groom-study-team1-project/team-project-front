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
import {
  ProfileImgDiv,
  ProfileImgContainer,
  CameraIcon,
  ImageCancel,
} from "../SignUpModal.style";
import {
  checkDuplicatedNickname,
  signUp,
} from "../../../../services/api/authApi";
import { imageUpload } from "../../../../services/api/imageApi";
import profileIcon from "../../../../assets/images/profileImg.png";
import cameraIcon from "../../../../assets/images/camera.png";
import { ProfileImg } from "./UserDetailsInputForm.style";
import { ErrMsg } from "../../../../assets/styles/ErrMsg.style";
function UserDetailsInputForm({ email, closeModal, changeModal }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    try {
      let errors = {};
      if (password.length < 8 || password.length > 16) {
        errors.password = "비밀번호는 8글자 이상 16글자 이하이어야 합니다.";
      }

      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`{}\[\]:;"'<>,.?/\\|]).+$/.test(
          password
        )
      ) {
        errors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }

      if (!/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber)) {
        errors.phoneNumber = "전화번호 형식을 맞춰주세요. 예: 010-1234-1234";
      }

      setErrors(errors);
      return Object.keys(errors).length === 0;
    } catch (err) {
      errors.nickname = err.message || "닉네임 관련 에러가 발생했습니다.";
    }
  };

  const handleNicknameBlur = async (value) => {
    console.log("handleNicknameBlur 호출됨:", value);

    if (value.length < 2 || value.length > 20) {
      console.log("닉네임 길이 조건 실패");
      setErrors((prev) => ({
        ...prev,
        nickname: "닉네임은 2글자부터 20글자까지 가능합니다.",
      }));
      return;
    }

    try {
      const isDuplicated = await checkDuplicatedNickname(value);

      if (isDuplicated) {
        setErrors((prev) => ({
          ...prev,
          nickname: "중복된 닉네임입니다.",
        }));
      } else {
        setErrors((prev) => {
          const { nickname, ...rest } = prev;
          return rest; // 닉네임 에러 제거
        });
      }
    } catch (err) {
      console.error("API 호출 실패:", err);
      setErrors((prev) => ({
        ...prev,
        nickname: "API 호출 실패: 닉네임 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  async function handleSignUp(e) {
    e.preventDefault();

    const isValid = await validateForm();

    if (isValid) {
      try {
        if (profileImg === "") {
          let body = {
            email,
            password,
            nickname,
            imageKey: "default-image/users/default-profile.png",
            phoneNumber,
          };
          const response = await signUp(body);
          console.log(response);
        } else {
          let body = {
            email,
            password,
            nickname,
            imageKey: profileImg,
            phoneNumber,
          };
          const response = await signUp(body);
          console.log(response);
        }

        changeModal("login");
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    try {
      const response = await imageUpload("PROFILE", file);
      if (response?.fileKey) {
        setPreviewImage(response.accessImage);
        setProfileImg(response.fileKey);
      } else {
        console.error("Invalid response format:", response);
        alert("이미지 업로드 실패: 서버 응답 오류");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <ModalTitle>
        <h1>회원가입</h1>
      </ModalTitle>
      <Form onSubmit={handleSignUp}>
        <ProfileImgDiv>
          <ProfileImgContainer>
            <label htmlFor="profileImgInput">
              <ProfileImg
                src={previewImage ? previewImage : profileIcon}
                alt="프로필사진"
                $default={!previewImage}
              />
              <CameraIcon src={cameraIcon} alt="카메라 아이콘" />
            </label>
            <input
              id="profileImgInput"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </ProfileImgContainer>

          <ImageCancel
            onClick={() => {
              setPreviewImage(null);
              setProfileImg("");
            }}
          >
            취소
          </ImageCancel>
        </ProfileImgDiv>
        <div>
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={(e) => handleNicknameBlur(e.target.value)}
            placeholder={"닉네임은 2글자부터 20글자까지 가능합니다."}
          />
          {errors.nickname && <ErrMsg>{errors.nickname}</ErrMsg>}
        </div>

        <div>
          <FormInputField
            label={"비밀번호"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={errors.password}
            placeholder={
              "8글자부터 16글자 영어 소문자,특수문자,숫자를 조합해주세요"
            }
          />
          {errors.password && <ErrMsg>{errors.password}</ErrMsg>}
        </div>
        <div>
          <FormInputField
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <ErrMsg>{errors.confirmPassword}</ErrMsg>}
        </div>
        <div>
          <FormInputField
            label={"휴대폰 번호"}
            type={"phoneNumber"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            hasError={errors.phoneNumber}
            placeholder={"010-1234-1234"}
          />
          {errors.phoneNumber && <ErrMsg>{errors.phoneNumber}</ErrMsg>}
        </div>

        <Divider />
        <BtnBox>
          <Btn onClick={closeModal}>취소</Btn>
          <Btn type="submit">계정 생성하기</Btn>
        </BtnBox>
      </Form>
    </Container>
  );
}

export default UserDetailsInputForm;
