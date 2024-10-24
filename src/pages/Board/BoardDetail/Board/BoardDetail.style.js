import styled from "styled-components";

export const Wrap = styled.div`
  width: 50vw;
  font-size: 16px;
`;

export const CategotyWrap = styled.div`
  width: 264px;
  height: 48px;
  display: flex;
  margin-bottom: 48px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  );
  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const CategoryTitle = styled.div`
  font-size: 30px;
  background: linear-gradient(to right bottom, #0b0611, #42469c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Postheader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

export const PostheaderRignt = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

export const Modify = styled.div`
  margin-left: 10px;
  cursor: pointer;
  position: relative;
`;

export const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 0px;
    margin-bottom: 0px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
`;

export const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  width: 103%;
  @media (max-width: 765px) {
    width: 115%;
  }
`;

export const IconWrap = styled.div`
  margin-top: 10px;
  margin-left: 16px;
`;
