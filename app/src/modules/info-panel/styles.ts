import styled from "styled-components";
import denim from "./../../assets/denim.webp"
import featurePlaceholder from "./../../assets/feature-placeholder.png"

export const InfoPaneContainer = styled.div`
  display: auto;
  width: 330px;
  height: 100vh;
  max-height: 100vh;
  background-color: whitesmoke;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: all !important;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${denim});
  }
`;

interface FeatureTitleContainerProps {
  background?: string;
}

export const FeatureTitleContainer = styled.div<FeatureTitleContainerProps>`
  background-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 90%),url(${featurePlaceholder});
  background-size: 110%;
  width: 100%;
  max-width: 320px;
  min-height: 80px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  transition: all 0.5s;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    height: 120px;
    background-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 90%), url(${featurePlaceholder});
    background-size: 100%;
  }
`

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  margin-right: 10px;
`

export const EachButton = styled.div`
  margin: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    scale: 1.1;
  }
`

export const FeatureTitle = styled.p`
  color: white;
  margin: 0;
  font-size: small;
  padding-left: 15px;
`

export const FeatureId = styled.h3`
  color: white;
  margin: 0;
  padding-left: 15px;
  padding-bottom: 5px;
`

export const FeatureAttributesContainer = styled.div`
  margin-left: 5px;
  width: 320px;

  @media (prefers-color-scheme: dark) {
    color: rgb(180,180,180);
    background-color: rgb(60, 60, 60);
  }
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

export const EmptyInfoPane = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: inherit;
`;