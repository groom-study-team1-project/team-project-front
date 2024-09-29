import styled from "styled-components";

export const SearchWrapper = styled.div`
  width: auto;
  height: 32px;
  display: flex;

  align-items: flex-end;
`;

export const SearchBox = styled.div`
  width: 378px;
  height: 32px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 20px;
  padding-right: 20px;
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.5)
  );

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 1px solid transparent;
    background: linear-gradient(
        10deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export const InnerSearch = styled.input`
  width: 378px;
  height: 30px;
  font-size: 16px;
  color: black;
  border: none;
  padding-left: 24px;
  background-color: transparent;

  &::placeholder {
    color: black;
  }

  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const OptionContainer = styled.div`
  position: relative;
  width: 100px;
`;

export const OptionToggle = styled.div`
  width: 80px;
  height: 8px;
  align-self: flex-end;
  border-radius: 20px;
  padding: 10px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  );
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const OptionIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  margin-top: 5px;
  padding: 5px;

  list-style: none;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.05),
    0 10px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  z-index: 1;
`;

export const OptionItem = styled.li`
  padding: 10px 10px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
