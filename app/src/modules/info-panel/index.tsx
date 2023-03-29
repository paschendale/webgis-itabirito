import { useState } from 'react';
import Collapsible from 'react-collapsible';
import Loader from "../../components/contentLoader";
import { 
  FeatureTitle, 
  FeatureId, 
  FeatureTitleContainer, 
  InfoPaneContainer, 
  FeatureAttributesContainer, 
  PropertyName,
  PropertyValue,
  PropertyContainer
} from "./styles"

interface InfoPaneProps {
  features: any | undefined;
  isLoading: boolean;
  display: boolean;
}

interface FeatureContainerProps {
  feature: any;
  index: number;
}

function FeatureContainer({feature,index}: FeatureContainerProps) {
  const[open,setOpen] = useState(false)

  function attributesToArray(object: any) {

    const objSize = Object.keys(object).length
    var attributesArray = []

    for (let index = 0; index < objSize; index++) {
      
      attributesArray.push({
        key: Object.keys(object)[index],
        value: Object.values(object)[index]
      })
    }

    return attributesArray;
  }

  return (
    <>
      <FeatureTitleContainer key={index} onClick={() => setOpen(!open)}>
        <FeatureTitle>{feature.id.split('.')[0]}</FeatureTitle>
        <FeatureId>{feature.id.split('.')[1]}</FeatureId>
      </FeatureTitleContainer>
      <Collapsible trigger={''} open={open}>
      <FeatureAttributesContainer> 
        {
          attributesToArray(feature.properties).map((e: any, i: number) => {
            return (
              <PropertyContainer key={i}>
                <PropertyName>
                  {e.key}
                </PropertyName>
                <PropertyValue>
                  {e.value}
                </PropertyValue>
              </PropertyContainer>
            )
          })
        }
      </FeatureAttributesContainer>
      </Collapsible>
    </>
  )
}

function InfoPanel({features,isLoading,display}: InfoPaneProps) {

  if (isLoading) {

    return (
      <InfoPaneContainer>
          <Loader/>
      </InfoPaneContainer>
    )
  } else if (features.length === 0) {

    return (
      <InfoPaneContainer>
        <FeatureTitleContainer>
          <p>Nenhuma feição foi selecionada</p>
        </FeatureTitleContainer>
      </InfoPaneContainer>
    )
  } else {

    return (
      <InfoPaneContainer>
        {
          features.map((e: any, i: number) => {

            return (
              <FeatureContainer key={i} feature={e} index={i}/>
            )
          })
        }
      </InfoPaneContainer>
    )
  }
}

export default InfoPanel