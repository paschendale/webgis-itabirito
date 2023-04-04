import styled from "styled-components";
import denim from "./../../assets/denim.webp";

export const SearchBoxContainer = styled.div`
  width: 300px;
  height: 60px;
  background-color: whitesmoke;
  position: absolute;
  z-index: 1000;
  margin: 10px;
  margin-left: 50px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.2);
  display: flex;
  box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

export const SearchInput = styled.input`
  width: 230px;
  height: 40px;
  background-color: rgb(223, 223, 223);
  border: none;
  padding-left: 10px;

  &:focus { 
    outline-color: rgb(0 0 0 / 60%);
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  }
  
  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-color: rgb(60, 60, 60);
  }
`;

export const SearchButton = styled.button`
  width: 40px;
  height: 42px;
  background-color: rgb(223, 223, 223);
  pointer-events: all;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    scale: 1.02;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
  }

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-color: rgb(60, 60, 60);
  }
`;
