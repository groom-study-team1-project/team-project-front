import styled from "styled-components";

export const NavBarSideContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background-color: #fff;
    z-index: 999;
    padding: 20px;
    font-weight: 500;
    opacity: 0.85;
`

export const SectionTitle = styled.h3`
        padding-top: 80px;
        padding-bottom: 10px;
        font-size: 32px;
        border-bottom: 2px solid #7d7d7d;
`

export const NavMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const NavMenuItem = styled.li`
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding-bottom: 10px;
    padding-top: 30px;
    border-bottom: 2px solid #cfcfcf;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    &:first-child {
        padding-top: 30px;
    }
    &:hover {
        border-left: 2px solid #2670e9;
    }

    &:hover ::after {
        transition: width 0.2s ease-in-out;
        width: 100%;
    }
    
    &:active{
        font-weight: bold;
    }
`
export const NavModalButtonBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: end;
`

export const UserImg = styled.img`
    border-radius: 20px;
    margin-top: 3px;
    width: 40px;
    height: 40px;
`
