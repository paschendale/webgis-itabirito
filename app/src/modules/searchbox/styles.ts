import styled from "styled-components";

export const SearchBoxContainer = styled.div`
  width: 300px;
  height: 60px;
  background-color: whitesmoke;
  position: relative;
  z-index: 1000;
  margin: 10px;
  margin-left: 50px;
  border-radius: 4px;
  border: 2px solid rgba(0,0,0,0.2);
  display: flex;
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