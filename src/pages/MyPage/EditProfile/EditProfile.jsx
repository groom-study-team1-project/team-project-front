import React, { useEffect, useState } from "react";
import { ProfileImage } from "../../../components/Card/PostCard/PostProfile";
import PasswordChange from "../../../components/Modal/PasswordChange/PasswordChange";
import {
  editProfile,
  checkDuplicatedNickname,
  fetchProfileInfo,
} from "../../../services/api/authApi";
import { imageUpload } from "../../../services/api/imageApi";
import { useParams, useNavigate } from "react-router-dom";
import useJwt from "../../../hooks/useJwt";
import { useSelector } from "react-redux";
import {
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
  ChecknickName,
  LabelTitle,
  EditProfileForm,
  EditProfileacticle,
} from "./EditProfile.style";
import { useMediaQuery } from "react-responsive";

const EditProfile = ({ setProfileState, isMeData }) => {
  const isSmallDesktop = useMediaQuery({ maxWidth: 1480 });
  const { memberId } = useParams();
  const [form, setForm] = useState({
    nickname: "",
    imageUrl: "",
    aboutMe: "",
    phoneNumber: "",
    githubUrl: "",
    blogUrl: "",
    job: "",
  });
  const [fileKey, setFilekey] = useState(null);
  const navigate = useNavigate();
  const payload = useJwt(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (!isMeData) {
      alert("본인 정보가 아닙니다.");
      navigate("/", { replace: true });
    }
  }, [isMeData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { isMe: payload?.userInfo?.id, memberId };
        const { data } = await fetchProfileInfo(body);
        const response = data.result;
        setForm({
          ...form,
          nickname: response.nickname || "",
          imageUrl: response.imageUrl || "",
          aboutMe: response.aboutMe || "",
          phoneNumber: response.phoneNumber || "",
          githubUrl: response.githubUrl || "",
          blogUrl: response.blogUrl || "",
          job: response.job || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [memberId, payload.userInfo]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkNickName, setCheckName] = useState(null);
  const [btn, setBtn] = useState(true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    try {
      const response = await imageUpload("PROFILE", file);
      if (response?.fileKey) {
        setForm({ ...form, imageUrl: response.accessImage });
        setFilekey(response.fileKey);
      } else {
        console.error("Invalid response format:", response);
        alert("이미지 업로드 실패: 서버 응답 오류");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOnChange = (e) => {
    if (e.target.name === "nickname") {
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
    console.log(form.nickname);
    const useNickname = await checkDuplicatedNickname(form.nickname);
    console.log(useNickname);
    if (useNickname.code === 2004) {
      setCheckName(true);
    } else {
      setCheckName(useNickname);
    }
  };

  const filterForm = () => {
    const { imageUrl, ...filterForm } = form;
    const updateForm = {
      ...filterForm,
      imageKey: fileKey,
    };
    return updateForm;
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const body = filterForm();
    console.log(body);
    try {
      await editProfile(body);
      setProfileState("mypost");
    } catch (error) {
      console.log(error);
    }
  };
  if (!isMeData) {
    return null;
  }
  return (
    <>
      <EditProfileForm onSubmit={handleonSubmit}>
        <Container>
          <ProfileImageWraps>
            <ProfileImage $size={"10%"} src={form.imageUrl} />
            <ProfileActions>
              <SubmitBtn
                type="button"
                $bgColor={"black"}
                onClick={() => document.getElementById("imageUpload").click()}
              >
                프로필사진 변경
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
                style={{ border: "1px solid black" }}
                onClick={() => {
                  setForm({
                    ...form,
                    imageUrl:
                      "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/default-image/users/default-profile.png",
                  });
                  setFilekey("default-image/users/default-profile.png");
                }}
              >
                사진 삭제
              </SubmitBtn>
            </ProfileActions>
          </ProfileImageWraps>
          <EditProfileacticle>
            <Label>
              <LabelTitle>닉네임 </LabelTitle>
              <NicknameContainer>
                <Input
                  placeholder="띄어쓰기 포함 총 20자로 입력해주세요"
                  value={form.nickname}
                  onChange={handleOnChange}
                  name="nickname"
                  width={"30%"}
                />
                <CheckButton onClick={handleOnchedknickName} disabled={btn}>
                  중복 확인
                </CheckButton>
              </NicknameContainer>
            </Label>
            {checkNickName === false ? (
              <Label>
                <LabelTitle></LabelTitle>
                <NicknameContainer>
                  <ChecknickName>사용 가능한 닉네임입니다</ChecknickName>
                </NicknameContainer>
              </Label>
            ) : checkNickName === true ? (
              <Label>
                <LabelTitle></LabelTitle>
                <NicknameContainer>
                  <ChecknickName color={"red"}>
                    중복된 닉네임입니다
                  </ChecknickName>
                </NicknameContainer>
              </Label>
            ) : null}

            <Label>
              <LabelTitle>자기소개 </LabelTitle>
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
              <LabelTitle>직업</LabelTitle>
              <NicknameContainer>
                <Input
                  placeholder="직업을 입력해주세요"
                  value={form.job}
                  onChange={handleOnChange}
                  name="job"
                  width={"40%"}
                />
              </NicknameContainer>
            </Label>
            <Label>
              <LabelTitle>연락처 </LabelTitle>
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
            <Label>
              <LabelTitle>githubUrl</LabelTitle>
              <NicknameContainer>
                <Input
                  placeholder="github URL"
                  value={form.githubUrl}
                  onChange={handleOnChange}
                  name="githubUrl"
                  width={"40%"}
                />
              </NicknameContainer>
            </Label>
            <Label>
              <LabelTitle>blogUrl</LabelTitle>
              <NicknameContainer>
                <Input
                  placeholder="github URL"
                  value={form.blogUrl}
                  onChange={handleOnChange}
                  name="blogUrl"
                  width={"40%"}
                />
              </NicknameContainer>
            </Label>
            <Label>
              <LabelTitle>비밀번호</LabelTitle>
              <NicknameContainer>
                <SubmitBtn
                  type="button"
                  style={{ padding: "1%" }}
                  $bgColor={"red"}
                  onClick={openModal}
                >
                  비밀번호 변경
                </SubmitBtn>
              </NicknameContainer>
            </Label>
          </EditProfileacticle>
        </Container>
        <ProfileFooter $mobail={isSmallDesktop}>
          <ButtonGroup>
            <SubmitBtn type="submit" $bgColor={"#B1CDE9"} $Color={"black"}>
              확인
            </SubmitBtn>
            <SubmitBtn
              type="button"
              $Color={"black"}
              $bgColor={"transparent"}
              style={{ border: "1px solid black" }}
              onClick={() => {
                setProfileState("mypost");
              }}
            >
              취소
            </SubmitBtn>
          </ButtonGroup>
        </ProfileFooter>
      </EditProfileForm>

      {isModalOpen && <PasswordChange setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default EditProfile;
