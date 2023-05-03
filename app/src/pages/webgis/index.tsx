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

import 'ol/ol.css';
import {
  MapComponent
} from '@terrestris/react-geo';

interface Layer {
  '@_queryable': string;
  Name: string,
}

function Map() {

  const location = useLocation()
  const mapRef = useRef<any>(null);

  // Project states
  const[projectId,setProjectId] = useState(location.pathname.split('/map/')[1])
  const[projectSettings,setProjectSettings] = useState({})
  const[layerOrder,setLayerOrder] = useState<string>('')
  const[layers,setLayers] = useState<Array<Layer>>()

  // Info Panel states
  const[displayLeftSidePanel,setdisplayLeftSidePanel] = useState(false)
  const[displayRightSidePanel,setdisplayRightSidePanel] = useState(false)
  const[features,setFeatures] = useState<any>()
  const[isLoadingInfoPanel,setIsLoadingInfoPanel] = useState(false)

  const layer = new OlLayerTile({
    source: new OlSourceOsm()
  });

  const map = new OlMap({
    view: new OlView({
      center: fromLonLat([-43.80376, -20.25554]),
      zoom: 14,
    })
  });

  useEffect(() => {
    if(layers && layerOrder) {

      makeLayers(layers,layerOrder)
    }
  },[layers])

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
          {/* 
          <MapContainer 
            center={[-20.25554, -43.80376]} 
            zoom={17} 
            scrollWheelZoom={true}
            attributionControl={false}
            ref={mapRef}
          >  
            <MapHandlers/>
            {layers && <>
              {
                makeLayers(layers,layerOrder)
              }
            </>}
            <SelectedFeatures
              features={features}
            />   
          </MapContainer> */}
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
