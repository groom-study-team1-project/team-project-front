import React, { useState } from "react";
import { ProfileImage } from "../../../components/Card/PostCard/PostProfile";
import PasswordChange from "../../../components/Modal/PasswordChange/PasswordChange";
import {
  editProfile,
  checkDuplicatedNickname,
  uploadProfileImage,
} from "../../../services/api/authApi";
import { useNavigate } from "react-router-dom";
import {
  PageNameWrap,
  PageName,
  Container,
  ProfileImageWraps,
  ProfileActions,
  Label,
  NicknameContainer,
  CheckButton,
  ButtonGroup,
  Input,
  ProfileFooter,
  SubmitBtn,
  ProfileImageWrapsRight,
  JobSelect,
  ChecknickName,
} from "./EditProfile.style";

const EditProfile = () => {
  const [form, setForm] = useState({
    nickName: "구름이",
    aboutMe: "나는야 ios 개발자",
    imageUrl:
      "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png",
    phoneNumber: "010-1234-1234",
    role: "STUDENT",
  });

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkNickName, setCheckName] = useState(null);
  const [btn, setBtn] = useState(true);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const response = await uploadProfileImage(imageUrl);
      console.log(response.imageUrl);
      setForm({ ...form, imageUrl: response.imageUrl });
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOnChange = (e) => {
    if (e.target.name === "nickName") {
      if (e.target.value.length > 0) {
        setBtn(false);
      }
      if (e.target.value.length === 0) {
        setBtn(true);
      }
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchedknickName = async (e) => {
    e.preventDefault();
    console.log(form.nickName);
    const useNickname = await checkDuplicatedNickname(form.nickName);
    setCheckName(useNickname);
    console.log(useNickname);
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const body = form;
    console.log(form);
    try {
      const result = await editProfile(body);
      console.log(result);
      const res = result.result;
      setForm({
        nickName: res.nickName,
        imageUrl: res.imageUrl,
        aboutMe: res.aboutMe,
        phoneNumber: res.phoneNumber,
        role: res.role,
      });
      const response = await editProfile(body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleonSubmit}>
        <PageNameWrap>
          <PageName>프로필 수정</PageName>
        </PageNameWrap>
        <Container>
          <ProfileImageWraps>
            <ProfileImage size={"150px"} src={form.imageUrl} />
            <ProfileImageWrapsRight>
              <ProfileActions>
                <SubmitBtn
                  type="button"
                  $bgColor={"#7682FF"}
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  사진 업로드
                </SubmitBtn>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <SubmitBtn
                  type="button"
                  $Color={"black"}
                  style={{ border: "1px solid #ACB6E5" }}
                  onClick={() => setForm({ ...form, imageUrl: "" })}
                >
                  사진 제거
                </SubmitBtn>
              </ProfileActions>
              <JobSelect
                value={form.role} // form의 role 값과 일치시킴
                name="role"
                onChange={handleOnChange} // 역할 변경 시 상태 업데이트
              >
                <option value="NORMAL">NORMAL</option>
                <option value="STUDENT">STUDENT</option>
                <option value="GRADUATE">GRADUATE</option>
              </JobSelect>
            </ProfileImageWrapsRight>
          </ProfileImageWraps>
          <Label>
            <div>닉네임 *</div>
            <NicknameContainer>
              <Input
                placeholder="사용자 이름은 띄어쓰기 포함 총 20자"
                value={form.nickName}
                onChange={handleOnChange}
                name="nickName"
                width={"20%"}
              />
              <CheckButton onClick={handleOnchedknickName} disabled={btn}>
                중복 확인
              </CheckButton>
            </NicknameContainer>
            {checkNickName === false ? (
              <ChecknickName>사용 가능한 닉네임입니다</ChecknickName>
            ) : checkNickName === true ? (
              <ChecknickName color={"red"}>중복된 닉네임입니다</ChecknickName>
            ) : null}
          </Label>
          <Label>
            <div>자기소개 *</div>
            <NicknameContainer>
              <Input
                placeholder="간단한 자기소개를 입력해주세요"
                value={form.aboutMe}
                onChange={handleOnChange}
                name="aboutMe"
                width={"40%"}
              />
            </NicknameContainer>
          </Label>
          <Label>
            <div>연락처 *</div>
            <NicknameContainer>
              <Input
                placeholder="연락처를 입력해주세요"
                value={form.phoneNumber}
                onChange={handleOnChange}
                name="phoneNumber"
                width={"40%"}
              />
            </NicknameContainer>
          </Label>
        </Container>
        <ProfileFooter>
          <SubmitBtn type="button" $bgColor={"#7682FF"} onClick={openModal}>
            비밀번호 변경
          </SubmitBtn>
          <ButtonGroup>
            <SubmitBtn type="submit" $bgColor={"#7682FF"}>
              확인
            </SubmitBtn>
            <SubmitBtn
              type="button"
              $Color={"#9DABED"}
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </SubmitBtn>
          </ButtonGroup>
        </ProfileFooter>
      </form>

      {isModalOpen && <PasswordChange setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default EditProfile;
