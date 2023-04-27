import styled from "styled-components";
import background from "./../../assets/background-osm.png"
import denim from "./../../assets/denim.webp";

export const GeoportalContainer = styled.div`
  background-color: whitesmoke;
  width: 100vw;
  min-height: calc(100vh -70px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 50px);
  }
  
  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${denim});
  }
`;

export const GeoportalViewport = styled.div`
  background-image: linear-gradient(rgba(255, 255, 255, 0.60), rgba(0, 0, 0, 0.40)), url(${background});
  background-position: cover;
  width: 80%;
  max-width: 1366px;
  min-height: calc(100vh - 70px);
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);

  @media (max-width: 768px) {
    min-height: calc(100vh - 50px);
  }

  
  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${denim});
  }
`;

export const ServicesTitleContainer = styled.div`
  display: flex;
  justify-content: center;  
`;

export const ServicesContainer = styled.div`
  background-color: rgb(150,150,150,0.5);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-color: rgb(100,100,100,0.2);
  }
`;

export const Navbar = styled.div`
  background-color: whitesmoke;
  z-index: 1000;
  position: sticky;
  width: 100vw;
  height: 70px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  color: black !important;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.2);

  &:visited {
    color: black;
  }

  @media (max-width: 768px) {
    font-size: small;
    height: 50px;
    margin: 0;
  }
  
  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${denim});
  }
`

export const NavbarBrand = styled.a`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`

export const NavbarTitle = styled.h3`
  color: rgb(180,180,180);
  font-weight: normal;
`

export const NavbarLogo = styled.img`
  height: 70%;
`

export const NavbarMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${denim});
  }
`

export const NavbarMenuItem = styled.p`
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;
  color: inherit;
`