import { MapContainer, useMapEvents, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react"
import SearchBox from '../searchbox';
import InfoPanel from '../info-panel';
import { Container } from './styles';
import { api } from '../../services/api';
import { LeafletMouseEvent } from 'leaflet';
import { generateQueryParams } from '../../utils';

interface Layer {
  '@_queryable': string;
  Name: string,
}

function Map() {
  const[projectId,setProjectId] = useState('7bdc970b4a613172c8a145565cff1014')
  const[projectSettings,setProjectSettings] = useState({})
  const[layerOrder,setLayerOrder] = useState<string>('')
  const[layers,setLayers] = useState<Array<Layer>>()

  // Info Panel states
  const[displayInfoPane,setDisplayInfoPane] = useState(false)
  const[features,setFeatures] = useState([])
  const[isLoadingInfoPanel,setIsLoadingInfoPanel] = useState(true)

  useEffect(() => {

    async function getProjectSettings() {
    
      const projectSettings = await api.get(
        `/settings/${projectId}` 
      )
  
      return projectSettings.data
    }
    
    getProjectSettings()
    .then(settings => {

      console.log(settings)
      setLayerOrder(settings.layerDrawingOrder)
      setLayers(settings.layers.Layer)
      setProjectSettings(settings)
    })
  },[projectId])

  function makeLayers(layers: any, order: string) {

    const content = order.split(',').map(
      (e,i) => {
        
        var layer = createLayer(
          layers.filter((l:any) => (l.Name === e))[0],
          (i === 0)
        )
        return layer
      })

    return content
  }

  function createLayer(layer: any, baseLayer?: boolean) {

    if(!baseLayer) {
      baseLayer = false
    }

    return (
      <WMSTileLayer
        key={layer.Name}
        id={layer.Name}
        url={`/api/map/${projectId}`}
        layers={layer.Name}
        format={baseLayer ? 'image/jpeg' : 'image/png'}
        transparent={!baseLayer}
      />
    )
  }

  async function getFeatureInfo(map: any, e: LeafletMouseEvent) {

      var point = map.latLngToContainerPoint(e.latlng)
      var size = map.getSize()
      var crs = map.options.crs
      var sw = crs?.project(map.getBounds().getSouthWest())
      var ne = crs?.project(map.getBounds().getNorthEast())
      var lyrs = layers?.filter(e => e['@_queryable'] === '1').map(e => e.Name)

      var params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        version: '1.1.0',
        srs: 'EPSG:3857',
        x: JSON.stringify(point.x),
        y: JSON.stringify(point.y),
        bbox: JSON.stringify(sw?.x) + ',' + JSON.stringify(sw?.y) + ',' + JSON.stringify(ne?.x) + ',' + JSON.stringify(ne?.y),
        height: JSON.stringify(size.y),
        width: JSON.stringify(size.x),
        layers: lyrs?.join(','),
        query_layers: lyrs?.join(','),
        info_format: 'application/json',
        with_geometry: 'true',
        feature_count: '50000'
    };

    var queryParams = generateQueryParams(params)

    var response = await api.get(`/map/${projectId}?${queryParams}`)

    var featureInfo = response.data

    console.log(featureInfo)
    setIsLoadingInfoPanel(false)   
    setFeatures(featureInfo.features)
    return featureInfo
  }

  const MapHandlers = () => {
    
    useMapEvents({
        click(e) {
          
          console.log("🚀 ~ file: index.tsx:108 ~ click ~ e", e)
          setIsLoadingInfoPanel(true) 
          getFeatureInfo(this,e)
        },
    });

    return null;
  };

  return ( 
    <Container>
      <SearchBox/>
      <InfoPanel 
        features={features} 
        isLoading={isLoadingInfoPanel}
        display={true}
      />
      <MapContainer 
        center={[-20.25554, -43.80376]} 
        zoom={17} 
        scrollWheelZoom={false}
        >        
        <MapHandlers/>
        {layers && <>
          {
            makeLayers(layers,layerOrder)
          }
        </>}
      </MapContainer>
    </Container>
  );
}

export default Map;
