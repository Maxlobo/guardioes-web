import styled from 'styled-components';
import { device } from 'utils/devices';
import {
  Link,
} from "react-router-dom";

export const Container = styled.div`
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    height: 8vh;
    background: #63D5A2;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0% 2%;
`;


export const Logo = styled.img`
  width: 80px;
  height: 35px;
`;

export const HeaderNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: max(200px, 30vw);
    margin-right: 20px;
    @media ${device.mobileL} {
      margin-right: 10px;
    };
`;

export const NavTo = styled(Link)`
    text-decoration: none;
    font-family: argumentum, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.825rem;
    color: #FFFFFF;
    margin-left: 10px;

    @media ${device.mobileL} {
      font-size: 15px;
    };
`;