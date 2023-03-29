import styled from "styled-components";

export const InfoPaneContainer = styled.div`
  display: auto;
  width: 300px;
  max-height: calc(100vh - 100px);
  background-color: whitesmoke;
  position: absolute;
  z-index: 1000;
  margin: 10px;
  margin-top: 80px;
  margin-left: 50px;
  border-radius: 4px;
  border: 2px solid rgba(0,0,0,0.2);
  overflow-y: auto;
  pointer-events: all !important;
`;

export const FeatureTitleContainer = styled.div`
  background-image: url('https://via.placeholder.com/300x80');
  width: 100%;
  min-height: 80px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s;

  /* &:hover {
    height: 120px;
    background-image: url('https://via.placeholder.com/300x120');
  } */
`

export const FeatureTitle = styled.p`
  margin: 0;
  padding-left: 15px;
`

export const FeatureId = styled.h2`
  margin: 0;
  padding-left: 15px;
`

export const FeatureAttributesContainer = styled.div`
`

export const PropertyContainer = styled.div`
  padding: 3px;
  padding-left: 10px;
`

export const PropertyName = styled.h4`
  margin: 0;
  font-size: small;
`

export const PropertyValue = styled.p`
  margin: 0;
  font-size: small;
`