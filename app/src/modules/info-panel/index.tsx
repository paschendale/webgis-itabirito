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

  function generateGetMapURL(feature: any): any {

    if (!feature.bbox || !map.get('projectId')) {
      return undefined
    }

    var extent = feature.bbox

    var os_x = (extent[2] - extent[0])*1.0001
    var os_y = (extent[3] - extent[1])*1.0001

    extent = [
      extent[0] - os_x,
      extent[1] - os_y,
      extent[2] + os_x,
      extent[3] + os_y
    ]

    // console.log('extent:', extent)
    var featureId = feature.id.split('.')
    // console.log(featureId)
    var featurePk = featureId.pop()
    // console.log(featurePk)
    var featureTitle = featureId.join('.')
    // console.log(featureTitle)

    const service = 'WMS';
    const version = '1.1.1';
    const request = 'GetMap';
    const format = 'image/png';
    const transparent = true;
    const layers = `${map.get('baseLayer')},${featureTitle}`;
    const width = 380;
    const height = 300;
    const crs = 'EPSG:3857';
    const selection = `${featureTitle}:${featurePk}`;
  
    const extentBbox = extent.join(',');
  
    const urlParams = new URLSearchParams();
    urlParams.set('SERVICE', service);
    urlParams.set('VERSION', version);
    urlParams.set('REQUEST', request);
    urlParams.set('FORMAT', format);
    urlParams.set('TRANSPARENT', String(transparent));
    urlParams.set('layers', layers);
    urlParams.set('WIDTH', String(width));
    urlParams.set('HEIGHT', String(height));
    urlParams.set('CRS', crs);
    urlParams.set('BBOX', extentBbox);
    urlParams.set('SELECTION', selection);
  
    return `/api/map/${map.get('projectId')}?${urlParams.toString()}`
  }
  
  function getFeatureMiniature(feature: any): string {

    if(feature.geometry) {
      return generateGetMapURL(feature)
    } else {
      return ''
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

  function openReport(feature:any, title: string) {

    var properties = feature.properties

    properties['entityName'] = title 
    properties['imgMap'] = generateGetMapURL(feature) 
    properties['imgFoto'] = properties.link_foto || properties.foto || ''
    const queryString = new URLSearchParams(properties).toString();
    const url = `/relatorio?${queryString}`;
    window.open(url, '_blank');
  }

  var featureId = feature.id.split('.')
  var featurePk = featureId.pop()
  var featureTitle = featureId.join('.')

  return (
    <>
      <FeatureTitleContainer key={index} background={getFeatureMiniature(feature)}
        onClick={() => { setOpen(!open); }
        }>
        <TextArea>
          <FeatureTitle>{featureTitle}</FeatureTitle>
          <FeatureId>{featurePk}</FeatureId>
        </TextArea>
        <ButtonArea>
          {feature.properties && <EachButton>
            <FaFilePdf 
              size={25} 
              onClick={
                () => openReport(feature,featureTitle)
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

            if (e.key !== 'geom' && e.key !== 'entityName' && e.key !== 'imgMap' && e.key !== 'imgFoto') {
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