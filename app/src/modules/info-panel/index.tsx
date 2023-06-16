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
import { FaFilePdf,  FaMapMarkerAlt } from 'react-icons/fa';
import OlMap from 'ol/Map';

interface InfoPaneProps {
  features: any | undefined;
  isLoading: boolean;
  map: any;
}

interface FeatureContainerProps {
  feature: any;
  index: number;
  map: any;
}

function FeatureContainer({feature,index,map}: FeatureContainerProps) {
  const[open,setOpen] = useState(false)

  function fitBounds(map: OlMap, bbox: [number, number, number, number]): any {

    if (map) {

      if (bbox[0] === bbox[2]) {
            
        map.getView().animate(
          {
            center: [bbox[0],bbox[1]],
            zoom: 19,
            duration: 1000
          }
        );
      } else {

        map.getView().fit(bbox, { padding: [50, 50, 50, 50], duration: 1000 })
      }
    }
  }

  // function getFeatureMiniature(feature: any): string {

  // snippet para obter miniatura da feicao em imageLayer
  // var olImageLayer = new ImageLayer({
  //   extent: map.getView().calculateExtent(map.getSize()),
  //   source: new ImageWMS({
  //     url: `/api/map/${projectId}`,
  //     params: {
  //       'layers': layer.Name, 
  //       'format': 'image/png',
  //       'maxZoom': 30,
  //       'transparent': true,
  //       'tiled': false
  //     },
  //     ratio: 1
  //   }),
  // })
  
  // map.addLayer(olImageLayer)

  //   if(feature.geometry) {
  //     return 'http://via.placeholder.com/300x80/000000?text=there is miniature'
  //   } else {
  //     return 'http://via.placeholder.com/300x80/000000?text=nothing to see here'
  //   }
  // }

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

  function openReport(properties: any, title: string) {

    properties['entityName'] = title 
    // properties['imgMap'] = `` 
    // properties['imgFoto'] = `` 
    const queryString = new URLSearchParams(properties).toString();
    const url = `/relatorio?${queryString}`;
    window.open(url, '_blank');
  }

  var featureId = feature.id.split('.')
  var featurePk = featureId.pop()
  var featureTitle = featureId.join('.')

  return (
    <>
      <FeatureTitleContainer key={index} onClick={() => setOpen(!open)}>
        <TextArea>
          <FeatureTitle>{featureTitle}</FeatureTitle>
          <FeatureId>{featurePk}</FeatureId>
        </TextArea>
        <ButtonArea>
          {feature.properties && <EachButton>
            <FaFilePdf 
              size={25} 
              onClick={
                () => openReport(feature.properties,featureTitle)
              }
            />
          </EachButton>}
          {feature.bbox && <EachButton>
            <FaMapMarkerAlt 
              size={25} 
              onClick={ (e: any) => {
                // console.log(e)
                fitBounds(map,feature.bbox)
              }}
            />
          </EachButton>}
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

function InfoPanel({features,isLoading,map}: InfoPaneProps) {
  
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
              <FeatureContainer key={i} feature={e} index={i} map={map}/>
            )
          })
        }
      </InfoPaneContainer>
    )
  }
}

export default InfoPanel