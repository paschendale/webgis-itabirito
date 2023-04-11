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
import { LatLng, Map, LatLngBoundsExpression } from 'leaflet';
import proj4 from 'proj4';

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

  function fitBounds(map: Map, bbox: [number, number, number, number]): any {

    const [xmin, ymin, xmax, ymax] = bbox;

    var bounds3857 = [
      [xmin, ymin],
      [xmax, ymax],
    ];

    // Define the projection of the source coordinates
    const sourceProjection = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';

    // Define the projection of the target coordinates (WGS84)
    const targetProjection = '+proj=longlat +datum=WGS84 +no_defs';

    // Define a Proj4js transformation function
    const transform = proj4(sourceProjection, targetProjection).forward;

    // Transform the bounds coordinates
    const boundsWGS84 = bounds3857.map(point => {
      const [lng, lat] = transform(point);
      return new LatLng(lat, lng);
    });

    const boundsTuple: LatLngBoundsExpression = [
      [boundsWGS84[0].lat, boundsWGS84[0].lng],
      [boundsWGS84[1].lat, boundsWGS84[1].lng]
    ];

    if (map) {
      map.flyToBounds(boundsTuple);
    }
  }

  // function getFeatureMiniature(feature: any): string {

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
                () => console.log(`i'm clicked`)
              }
            />
          </EachButton>}
          {feature.bbox && <EachButton>
            <FaMapMarkerAlt 
              size={25} 
              onClick={
                fitBounds(map,feature.bbox)
              }
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