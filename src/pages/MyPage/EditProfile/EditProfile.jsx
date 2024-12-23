import React, { useEffect, useState } from "react";
import { ProfileImage } from "../../../components/Card/PostCard/PostProfile";
import PasswordChange from "../../../components/Modal/PasswordChange/PasswordChange";
import {
  editProfile,
  checkDuplicatedNickname,
  uploadProfileImage,
  fetchProfileInfo,
  reToken,
} from "../../../services/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import useJwt from "../../../hooks/useJwt";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../../../store/user/userSlice";
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
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nickname: "",
    imageUrl: "",
    aboutMe: "",
    phoneNumber: "",
    githubUrl: "",
    blogUrl: "",
    job: "",
  });

  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          isMe: payload.memberId,
          memberId: memberId,
        };
        const { data } = await fetchProfileInfo(body);
        const response = data.result;
        console.log(response);
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
  }, [memberId, payload]);

  const navigate = useNavigate();
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
      const formData = new FormData();
      formData.append("imageFile", file);
      const response = await uploadProfileImage(formData);
      if (response?.data?.result?.imageUrl) {
        setForm({ ...form, imageUrl: response.data.result.imageUrl });
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

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const body = form;
    try {
      await editProfile(body);
      const response = await reToken();
      const newAccessToken = response.result.accessToken;
      const decodedPayload = JSON.parse(atob(newAccessToken.split(".")[1]));
      console.log(decodedPayload);
      dispatch(
        updateToken({
          accessToken: response.result.accessToken,
          refreshToken: response.result.refreshToken,
        })
      );
      navigate(`/my-page/${memberId}`);
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
            <ProfileImage $size={"150px"} src={form.imageUrl} />
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
                  onClick={() =>
                    setForm({
                      ...form,
                      imageUrl:
                        "https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/profiles/002da67c_1730807352645.png",
                    })
                  }
                >
                  사진 제거
                </SubmitBtn>
              </ProfileActions>
              <JobSelect
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
                value={form.nickname}
                onChange={handleOnChange}
                name="nickname"
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
          <Label>
            <div>githubUrl</div>
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
            <div>blogUrl</div>
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
