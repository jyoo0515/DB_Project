import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <LandingHeader>PRETALK</LandingHeader>
      <LandingNav>
        <LandingLink to="/login">LOGIN</LandingLink>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <LandingLink to="/register">REGISTER</LandingLink>
      </LandingNav>
      <LandingArticle>
        <LandingImg />
      </LandingArticle>
      <LandingFooter>
        2020147507 임채림, 2020147511 이건, 2020147515 유회성, 2020147549 윤민균, 2020147569 이승재, 2020147570 권동욱
      </LandingFooter>
    </>
  );
};

const LandingHeader = styled.header`
  position: absolute;
  left: 5vw;
  top: 7vh;
  font-size: 5rem;
  font-weight: thick;
`;

const LandingNav = styled.nav`
  position: absolute;
  right: 5vw;
  top: 5vh;
  font-size: 1.5rem;
  @media screen and (max-width: 767px) {
    display: inline-block;
    text-align: center;
    width: 100%;
    top: 20vh;
  }
`;

const LandingLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const LandingArticle = styled.article`
  position: absolute;
  top: 20vh;
  left: 10vw;
  @media screen and (max-width: 767px) {
    top: 25vh;
  }
`;

const LandingImg = styled.img`
  margin: 0 auto;
  width: 80vw;
  height: 60vh;
  content: url("../../../../landingPage.png");
`;

const LandingFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  color: gray;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
`;
