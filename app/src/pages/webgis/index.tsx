// import { MapContainer, useMapEvents, WMSTileLayer } from 'react-leaflet'
// import { LeafletMouseEvent } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import SelectedFeatures from './components/selectedFeatures';
import './styles.css'
import { ButtonsContainer, Container, LeftSidePanel, LeftSidePanelSwitcher, MapContainer, MiddlePanel, RightSidePanel, RightSidePanelSwitcher, Version } from './styles';
import { useEffect, useRef, useState } from "react"
import SearchBox from '../../modules/searchbox';
import InfoPanel from '../../modules/info-panel';
import { api } from '../../services/api';
import { generateQueryParams, toastError } from '../../utils';
import { FaCaretLeft, FaCaretRight, FaGithub, FaRulerCombined, FaStreetView } from 'react-icons/fa';
import PanoramicViewer from '../../components/panoramic-viewer';
import { useLocation } from 'react-router-dom';
import pj from "./../../../package.json"
import 'proj4';
import 'proj4leaflet';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import MapButton from '../../components/mapButton';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from "ol/style";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import Feature from 'ol/Feature';

import 'ol/ol.css';
import {
  MapComponent
} from '@terrestris/react-geo';

interface Layer {
  '@_queryable': string;
  Name: string,
}

const map = new OlMap({
  view: new OlView({
    center: fromLonLat([-43.80376, -20.25554]),
    zoom: 14,
  })
});

function Map() {

  const location = useLocation()
  const mapRef = useRef<any>(null);

  // Project states
  const[projectId,setProjectId] = useState(location.pathname.split('/map/')[1])
  const[projectSettings,setProjectSettings] = useState({})
  const[layerOrder,setLayerOrder] = useState<string>('')
  const[layers,setLayers] = useState<Array<Layer>>()
  const[getFeatureInfoUrl,setGetFeatureInfoUrl] = useState<string>()

  // Info Panel states
  const[displayLeftSidePanel,setdisplayLeftSidePanel] = useState(false)
  const[displayRightSidePanel,setdisplayRightSidePanel] = useState(false)
  const[features,setFeatures] = useState<any>()
  const[isLoadingInfoPanel,setIsLoadingInfoPanel] = useState(false)

  useEffect(() => {
    if(layers && layerOrder) {

      buildQGISLayers(layers,layerOrder)
    }
  },[layers])

  useEffect(() => {

    var mapLayers = map
      .getAllLayers()
      .filter(layer => layer.get('name') === 'selectedFeatures')
    
    if(mapLayers.length !== 0) {
      
      mapLayers.forEach(layer => map.removeLayer(layer))
    }

    if(features && features.length !== 0) {

      var selectedFeatures = buildSelectLayer(features)
      map.addLayer(selectedFeatures)    

      if (selectedFeatures.getSource()?.getExtent()) {

        map.getView().fit(selectedFeatures.getSource()?.getExtent()!, { padding: [50, 50, 50, 50], duration: 1000 });
      }
    }
  },[features])

  useEffect(() => {
    map.updateSize()    
  },[displayLeftSidePanel,displayRightSidePanel])

  useEffect(() => {

    async function getProjectSettings() {
    
      try {
        
        const projectSettings = await api.get(
          `/settings/${projectId}` 
        )
    
        return projectSettings.data
      } catch (error:any) {

        if (error.response.status === 401) {
          
          toastError('O usuário não possui credenciais válidas para acessar este projeto.')
        } else {

          toastError('Ocorreu um erro ao tentar obter as configurações do projeto.')
        }

        throw error
      }
    }
    
    getProjectSettings()
    .then(settings => {

      setLayerOrder(settings.layerDrawingOrder)
      setLayers(settings.layers.Layer)
      setProjectSettings(settings)
    })
    .catch((error: any) => null)
  },[projectId])

  useEffect(() => {
    if (getFeatureInfoUrl) {

      var layers = map.getAllLayers()
      console.log("🚀 ~ file: index.tsx:129 ~ useEffect ~ layers:", layers)

      getFeatureInfo(getFeatureInfoUrl)
    }
  },[getFeatureInfoUrl])

  async function getFeatureInfo(url: string) {

    setIsLoadingInfoPanel(true)  
    setdisplayLeftSidePanel(true)
    
    try {
      
      var response = await api.get(url)

      var featureInfo = response.data

      setIsLoadingInfoPanel(false)   
      setFeatures(featureInfo.features)
      return featureInfo
    } catch (error: any) {
      
      setIsLoadingInfoPanel(false)   
      setFeatures([])
      
      if (error.response.status === 401) {
          
        toastError('O usuário não possui credenciais válidas para realizar esta operação.')
      } else {

        toastError('Ocorreu um erro ao tentar obter as feições no local selecionado.')
      }

      throw error
    }
  }

  map.on('singleclick', function (e) {
    const viewResolution = (map.getView().getResolution());

    if (map.getAllLayers()[0]) {

      var source = map.getAllLayers()[0].getSource() as TileWMS

      var lyrs = layers?.filter(e => e['@_queryable'] === '1').map(e => e.Name)

      var url = source.getFeatureInfoUrl(
        e.coordinate,
        viewResolution!,
        'EPSG:3857',
        {
          info_format: 'application/json',
          with_geometry: 'true',
          feature_count: '50000',
          layers: lyrs?.join(','),
          query_layers: lyrs?.join(',')
        }
      )

      if (url !== getFeatureInfoUrl) {
        setGetFeatureInfoUrl(url?.replace('api/map','map/info')!)
      }
    }
  });

  function switchLeftPanel() {

    setdisplayLeftSidePanel(!displayLeftSidePanel)
  }

  function switchRightPanel() {

    setdisplayRightSidePanel(!displayRightSidePanel)
  }
  
  function measureTool(e: any) {
    console.log('mediremos em breve')
  }

  function streetView(e: any) {
    console.log('veremos em breve')
  }

  function buildQGISLayers(layers: any, order: string) {

    const content = order.split(',').map(
      (e,i) => {
        
        var layer = layers.filter((l:any) => (l.Name === e))[0]
        var baseLayer = (i === 0)
        
        if(!baseLayer) {
          baseLayer = false
        }

        var olLayer = new TileLayer({
          source: new TileWMS({
            url: `/api/map/${projectId}`,
            params: {
              'layers': layer.Name, 
              'format': baseLayer ? 'image/jpeg' : 'image/png',
              'maxZoom': 30,
              'transparent': !baseLayer
            }
          }),
        })
    
        map.addLayer(olLayer)
      })

    return content
  }

  function buildSelectLayer(features: GeoJSON, style?: any) {

    function makeGeojson(features: any): any {

      if(features === undefined) {
        return {
          type: 'FeatureCollection',
          features: []
        }
      }
      
      var geojson = {
        type: 'FeatureCollection',
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
        features: features
      }
    
      return geojson
    }

    const geojson: Array<Feature> = new GeoJSON().readFeatures(makeGeojson(features));
  
    var selectedStyle = new Style({
      stroke: new Stroke({
        color: "rgb(255, 208, 0)",
        width: 3,
      }),
      fill: new Fill({
        color: "rgba(255, 208, 0, 0.35)",
      }),
    })
  
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: geojson
      }),
      zIndex: 10,
      style: selectedStyle,
      properties: {
        name: 'selectedFeatures'
      }
    });
  
    return vectorLayer
  }

  return ( 
    <>
      <Container>
        <LeftSidePanel display={displayLeftSidePanel}>
          <InfoPanel 
            features={features} 
            isLoading={isLoadingInfoPanel}
            map={mapRef.current}
          />
        </LeftSidePanel>
        <MiddlePanel>
          
          <LeftSidePanelSwitcher onClick={switchLeftPanel}>
              {(displayLeftSidePanel)? (<FaCaretLeft/>) : (<FaCaretRight/> )}
          </LeftSidePanelSwitcher>
          <ButtonsContainer>
            <MapButton onClick={measureTool}><FaRulerCombined/></MapButton>
            <MapButton onClick={streetView}>
              <FaStreetView />
            </MapButton>
          </ButtonsContainer>
          <SearchBox 
            setFeatures={setFeatures}
            setLoading={setIsLoadingInfoPanel}
            setDisplayLeftSidePanel={setdisplayLeftSidePanel}
            layers={layers}
          />
          <MapContainer id="map-container">
            <MapComponent id="map-component"
              map={map}
            />
          </MapContainer>
          <Version>
            <div style={{padding: 4}}>
              webgis-itabirito:v.{pj.version} <a style={{color: 'inherit'}} href='https://github.com/paschendale/webgis-itabirito' target={'_blank'} rel="noreferrer"><span style={{color: 'inherit'}}><FaGithub/></span></a>
            </div>
          </Version>
          <RightSidePanelSwitcher onClick={switchRightPanel}>
              {(displayRightSidePanel)? (<FaCaretRight/> ) : (<FaCaretLeft/>)}
          </RightSidePanelSwitcher>
        </MiddlePanel>
        <RightSidePanel display={displayRightSidePanel}>
            <PanoramicViewer></PanoramicViewer>
        </RightSidePanel>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Map;