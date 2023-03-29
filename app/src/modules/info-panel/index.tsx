import { FeatureTitle, FeatureId, FeatureTitleContainer, InfoPaneContainer } from "./styles"

interface InfoPaneProps {
  features: any;
  display: boolean;
}

function InfoPanel({features,display}: InfoPaneProps) {

  return (
    <InfoPaneContainer>
      {features.map((e: any) => {
        return (
        <FeatureTitleContainer>
          <FeatureTitle>{e.id.split('.')[0]}</FeatureTitle>
          <FeatureId>{e.id.split('.')[1]}</FeatureId>
        </FeatureTitleContainer>)
      })}
    </InfoPaneContainer>
  )
}

export default InfoPanel