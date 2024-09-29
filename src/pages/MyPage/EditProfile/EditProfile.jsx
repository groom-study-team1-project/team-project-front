import React, { useState } from "react";
import { ProfileImage } from "../../../components/Card/PostCard/PostProfile";
import PasswordChange from "../../../components/Modal/PasswordChange/PasswordChange";
import { editProfile } from "../../../services/api/authApi";
import { useNavigate } from "react-router-dom";
import {
  PageNameWrap,
  PageName,
  Container,
  Leftaside,
  ProfileActions,
  FormGroup,
  RightSection,
  Label,
  ButtonGroup,
  EmailWrap,
  EmailDescription,
  RightProfile,
  SubmitBtn,
  ProfileBottom,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, imageUrl: imageUrl });
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        phoneNumber: res.tel,
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
          <Leftaside>
            <ProfileImage
              size={"150px"}
              src={form.imageUrl} // 이미지 미리보기
            />
            <ProfileActions>
              <SubmitBtn
                type="button"
                $bgColor={"#7682FF"}
                onClick={() => document.getElementById("imageUpload").click()} // 버튼 클릭 시 input 클릭
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
            <ProfileBottom>
              <FormGroup>
                <input
                  placeholder="사용자 이름은 띄어쓰기 포함 총 20자"
                  value={form.nickName}
                  onChange={handleOnChange}
                  name="nickName"
                />
              </FormGroup>
              <FormGroup>
                <select
                  value={form.role} // form의 role 값과 일치시킴
                  name="role"
                  onChange={handleOnChange} // 역할 변경 시 상태 업데이트
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="STUDENT">STUDENT</option>
                  <option value="GRADUATE">GRADUATE</option>
                </select>
              </FormGroup>
            </ProfileBottom>
          </Leftaside>
          <RightSection>
            <RightProfile>
              <Label>
                <div>Email</div>
                <EmailWrap>
                  <input
                    type="email"
                    value={"test@test.com"}
                    disabled
                    style={{ backgroundColor: "#C0C0C0" }}
                    name="email"
                  />
                  <EmailDescription>
                    이메일은 변경할 수 없습니다
                  </EmailDescription>
                </EmailWrap>
              </Label>

              <Label>
                <div>Phone</div>
                <input
                  value={form.phoneNumber}
                  onChange={handleOnChange}
                  name="phoneNumber"
                />
              </Label>
              <Label>
                <div>자기소개</div>
                <textarea
                  value={form.aboutMe}
                  onChange={handleOnChange}
                  name="aboutMe"
                />
              </Label>
              <SubmitBtn type="button" $bgColor={"#7682FF"} onClick={openModal}>
                비밀번호 변경
              </SubmitBtn>
            </RightProfile>
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
          </RightSection>
        </Container>
      </form>

      {isModalOpen && <PasswordChange setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default EditProfile;
