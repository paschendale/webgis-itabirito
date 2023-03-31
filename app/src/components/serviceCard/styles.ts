import styled from "styled-components";

export const ServiceCardContainer = styled.div`
  margin: 5px;
  height: 150px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  border-radius: 4px;
  overflow: clip;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    scale: 1.02;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 120px;
  }
`;

export const Card = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 120px;
    width: 120px;
  }
`

export const CardTitle = styled.p`
  padding-left: 5px;
  padding-right: 5px;
  font-variant: small-caps;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: xx-small;
  }
`
export const CardSubtitle = styled.h3`
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: small;
  }
`
export const CardHref = styled.a`
  text-decoration: none;
`