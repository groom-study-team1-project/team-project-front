import styled from "styled-components";

export const EditProfileWrapper = styled.div`
  width: 1450px;
  border: 1px solid;
  padding: 40px;
`;

export const ProfileActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const FlexDiv = styled.div`
  display: flex;
  border-bottom: 1px solid;
  padding: 20px 0;
`;

export const Label = styled.p`
  width: 400px;
`;

export const Input = styled.input`
  width: 500px;
  height: 36px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

export const ProfileButton = styled.button`
  width: 70px;
  height: 35px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

export const PasswordButton = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 10px;
`;

export const JobSelect = styled.select`
  width: 250px;
  height: 36px;
  margin-bottom: 10px;
`;

export const SelfIntroductionTextarea = styled.textarea`
  width: 500px;
  height: 108px;
  margin-bottom: 10px;
`;
