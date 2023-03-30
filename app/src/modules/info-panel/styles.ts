import styled from "styled-components";

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
`;

interface FeatureTitleContainerProps {
  background?: string;
}

export const FeatureTitleContainer = styled.div<FeatureTitleContainerProps>`
  background-image: url('http://via.placeholder.com/280x80/000000?text=nothing to see here');
  width: 100%;
  max-width: 320px;
  min-height: 80px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.5s;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    height: 120px;
    background-image: url('http://via.placeholder.com/280x120/000000?text=nothing to see here');
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