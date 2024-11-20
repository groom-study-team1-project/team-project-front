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
import profileIcon from "../../../../assets/images/profileImg.png";
import cameraIcon from "../../../../assets/images/camera.png";
import { ProfileImg } from "./UserDetailsInputForm.style";

function UserDetailsInputForm({ email, handlePrev, changeModal }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
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

      if (password !== confirmPassword) {
        errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }

      if (!/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber)) {
        errors.phoneNumber = "전화번호 형식을 맞춰주세요. 예: 010-0000-0000";
      }

      setErrors(errors);
      return Object.keys(errors).length === 0;
    } catch (err) {
      errors.nickname = err.message || "닉네임 관련 에러가 발생했습니다.";
    }
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
      console.log("중복 검사 결과:", isDuplicated);

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
        const profileImgUrl = await uploadImageAndGetUrl();
        if (profileImgUrl) {
          let body = {
            email,
            password,
            nickname,
            imageUrl: profileImgUrl,
            phoneNumber,
          };
          const response = await signUp(body);
          console.log(response);
        } else {
          let body = {
            email,
            password,
            nickname,
            imageUrl:
              "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg",
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
          <div
            style={{
              width: "120px",
              height: "120px",
              boxSizing: "border-box",
              overflow: "hidden",
              marginRight: "20px",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <label htmlFor="profileImgInput">
              <ProfileImg
                src={previewImage ? previewImage : profileIcon}
                alt="프로필사진"
                style={{ width: "150px", height: "150px" }}
              />
              <img
                src={cameraIcon}
                alt="카메라 아이콘"
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "15px",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              id="profileImgInput"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </ProfileImgDiv>
        <div>
          <FormInputField
            label={"닉네임"}
            type={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={(e) => handleNicknameBlur(e.target.value)}
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
