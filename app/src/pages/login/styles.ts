import styled from "styled-components";
import denim from "./../../assets/denim.webp";

export const LoginPage = styled.div`
  background-color: whitesmoke;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${denim});
  }
`;

export const LoginContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: 50%;
  max-height: 350px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);

  @media (max-width: 768px) {
    flex-direction: column;
    height: 90%;
    max-height: 90%;
  }

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${denim});
  }
`

export const LeftSide = styled.div`
  width: 50%;
  height: 80%;
  border-right: 1px whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 90%;
  }
`

export const RightSide = styled.div`
  width: 50%;
  height: 80%;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 90%;
  }
`

export const Form = styled.form`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (prefers-color-scheme: dark) {
    color: whitesmoke;
  }
`