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
  PropertyContainer,
  EmptyInfoPane,
  TextArea,
  ButtonArea,
  EachButton
} from "./styles"
import { FaFilePdf, FaLocationArrow, FaMapMarkerAlt } from 'react-icons/fa';

interface InfoPaneProps {
  features: any | undefined;
  isLoading: boolean;
}

interface FeatureContainerProps {
  feature: any;
  index: number;
}

function FeatureContainer({feature,index}: FeatureContainerProps) {
  const[open,setOpen] = useState(false)
  
  function getFeatureMiniature(feature: any): string {

    if(feature.geometry) {
      return 'http://via.placeholder.com/300x80/000000?text=there is miniature'
    } else {
      return 'http://via.placeholder.com/300x80/000000?text=nothing to see here'
    }
  }

  function attributesToArray(object: any) {

    const objSize = Object.keys(object).length
    var attributesArray = []

    for (let index = 0; index < objSize; index++) {
      
      attributesArray.push({
        key: Object.keys(object)[index],
        value: (typeof(Object.values(object)[index]) === 'object') ? JSON.stringify(Object.values(object)[index]) : Object.values(object)[index]
      })
    }

    return attributesArray;
  }

  return (
    <>
      <FeatureTitleContainer key={index} onClick={() => setOpen(!open)}>
        <TextArea>
          <FeatureTitle>{feature.id.split('.')[0]}</FeatureTitle>
          <FeatureId>{feature.id.split('.')[1]}</FeatureId>
        </TextArea>
        <ButtonArea>
          <EachButton>
            <FaMapMarkerAlt size={25} onClick={() => console.log(`i'm clicked`)}/>
          </EachButton>
          <EachButton>
            <FaFilePdf size={25} onClick={() => console.log(`i'm clicked`)}/>
          </EachButton>
        </ButtonArea>
      </FeatureTitleContainer>
      <Collapsible trigger={''} open={open}>
      <FeatureAttributesContainer> 
        {
          attributesToArray(feature.properties).map((e: any, i: number) => {

            if (e.key !== 'geom') {
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
            } else {
              
              return null
            }
          })
        }
      </FeatureAttributesContainer>
      </Collapsible>
    </>
  )
}

function InfoPanel({features,isLoading}: InfoPaneProps) {
  
  if (isLoading) {

    return (
      <InfoPaneContainer>
          <Loader/>
      </InfoPaneContainer>
    )
  } else if (!features || features.length === 0) {

    return (
      <InfoPaneContainer>
        <EmptyInfoPane>
          <p>Nenhuma feição foi selecionada</p>
        </EmptyInfoPane>
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