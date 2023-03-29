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

interface FeatureTitleContainerProps {
  background?: string;
}

export const FeatureTitleContainer = styled.div<FeatureTitleContainerProps>`
  background-image: url('http://via.placeholder.com/300x80/000000?text=nothing to see here');
  width: 100%;
  min-height: 80px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    height: 120px;
    background-image: url('http://via.placeholder.com/300x120/000000?text=nothing to see here');
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