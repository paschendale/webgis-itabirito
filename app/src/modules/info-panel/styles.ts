import styled from "styled-components";

export const InfoPaneContainer = styled.div`
  display: auto;
  width: 300px;
  height: calc(100% - 100px);
  max-height: calc(100% - 100px);
  background-color: whitesmoke;
  position: relative;
  z-index: 1000;
  margin: 10px;
  margin-left: 50px;
  border-radius: 4px;
  border: 2px solid rgba(0,0,0,0.2);
  overflow-y: auto;
`;

export const FeatureTitleContainer = styled.div`
  background-image: url('https://via.placeholder.com/300x80');
  width: 100%;
  height: 80px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const FeatureTitle = styled.p`
  margin: 0;
  font-size: smaller;
  padding-left: 15px;
`

export const FeatureId = styled.h3`
  margin: 0;
  font-size: large;
  padding-left: 15px;
`