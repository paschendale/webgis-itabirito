import styled from "styled-components";

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
`;

export const SearchInput = styled.input`
  margin-top: 10px;
  margin-left: 10px;
  width: 230px;
  height: 40px;
  background-color: rgb(223, 223, 223);
  border: none;
  padding-left: 10px;
`;

export const SearchButton = styled.button`
  margin-top: 10px;
  width: 40px;
  height: 42px;
  background-color: rgb(223, 223, 223);
  border: none;
  pointer-events: all;
  cursor: pointer;
`;
