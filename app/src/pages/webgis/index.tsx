import './styles.css'
import { ButtonsContainer, Container, CoordinatesContainer, Footer, LeftSidePanel, LeftSidePanelSwitcher, MapContainer, MiddlePanel, RightSidePanel, RightSidePanelSwitcher, Toolbox, VersionContainer } from './styles';
import { useEffect, useRef, useState } from "react"
import SearchBox from '../../modules/searchbox';
import InfoPanel from '../../modules/info-panel';
import { api } from '../../services/api';
import { toastError } from '../../utils';
import { FaCaretLeft, FaCaretRight, FaCaretUp, FaCopy, FaDrawPolygon, FaGithub, FaRegCopy, FaRulerCombined, FaStreetView, FaToolbox } from 'react-icons/fa';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import PanoramicViewer from '../../components/panoramic-viewer';
import { useLocation } from 'react-router-dom';
import pj from "./../../../package.json"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import MapButton from '../../components/mapButton';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Circle, Fill, Stroke, Style } from "ol/style";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import Feature from 'ol/Feature';
import 'ol/ol.css';
import {
  MapComponent,
  MeasureButton,
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

function Coordinates({coordinatesOnDisplay, coordinatesDisplayMode, coordinatesOnMouse}: any) {
  
  const[coordinatesToClipboard,setCoordinatesToClipboard] = useState<number[]>()
  
  useEffect(() => {
    if(coordinatesToClipboard) {
      navigator.clipboard.writeText(
        coordinatesToClipboard.join(` , `)
      )
      toast.info('Coordenadas copiadas para a área de transferência')
    }
  },[coordinatesToClipboard])

  function formatCoordinate(index: number) {

    if (coordinatesDisplayMode === 'mouse') {

      if ( index < coordinatesOnMouse.length ) {

      return (Math.round(coordinatesOnMouse[index]*10000)/10000)
      }
    } else {

      if (index < coordinatesOnDisplay.length) {

        return (Math.round(coordinatesOnDisplay[index]*10000)/10000)
      }
    } 
  }

  return (
    coordinatesOnDisplay && <>
        {(coordinatesDisplayMode !== 'bbox') ? (
          <>
            Coordenadas do {coordinatesDisplayMode} -  
            Lat: { formatCoordinate(1) }
            &nbsp;
            Lon: { formatCoordinate(0) }
            &nbsp;&nbsp;&nbsp;
          </>
        ) : (
          <>
            Coordenadas do retângulo do mapa -  
            NE Lat: { formatCoordinate(1) }
            &nbsp;
            NE Lon:: { formatCoordinate(0) }
            &nbsp;
            SE Lat: { formatCoordinate(3) }
            &nbsp;
            NE Lon:: { formatCoordinate(2) }
            &nbsp;
          </>
        )}
        <FaRegCopy onClick={() => setCoordinatesToClipboard(coordinatesOnDisplay)} style={{cursor: 'pointer'}}/>
    </>
    )
}

function Map() {

  const location = useLocation()

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

  // Tools states & refs
  const[isEnabledToolbox,setIsEnabledToolbox] = useState(false)
  const[coordinatesOnDisplay,setCoordinatesOnDisplay] = useState<number[]>([0,0])
  const[coordinatesOnMouse,setCoordinatesOnMouse] = useState<number[]>([0,0])
  const[coordinatesDisplayMode,setCoordinatesDisplayMode] = useState('centro')

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

      try {

        var extent = selectedFeatures.getSource()?.getExtent()
        
        if (extent) {

          if (extent[0] === extent[2]) {
            
            map.getView().animate(
              {
                center: [extent[0],extent[1]],
                zoom: 19,
                duration: 1000
              }
            );
          } else {

            map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 });
          }
        }
      } catch (error) {
        
        console.log('Não foi possível ajustar o mapa nas feições selecionadas',error)
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
      map.getAllLayers().filter(layer => layer.get('name') === 'react-geo_measure')[0].setZIndex(1000)
    })
    .catch((error: any) => null)
  },[projectId])

  useEffect(() => {
    if (getFeatureInfoUrl && !isEnabledToolbox) {

      getFeatureInfo(getFeatureInfoUrl)
    }
  },[getFeatureInfoUrl])  

  useEffect(() => {
    if (isEnabledToolbox) {

      toast.info('A seleção de feições no mapa foi desabilitada, desative a caixa de ferramentas para ativá-la novamente')
    }
  },[isEnabledToolbox])

  useEffect(() => {

    var d = coordinatesDisplayMode
    if(d === 'centro') {

      var transformedCoordinates = toLonLat(map.getView().getCenter()!)
      setCoordinatesOnDisplay(transformedCoordinates)
    } else if(d === 'mouse') {
      
      var transformedCoordinates = toLonLat(map.getView().getCenter()!)
      setCoordinatesOnMouse(transformedCoordinates)
    } else {

      var extent = map.getView().calculateExtent()
      var transformedCoordinatesNW = toLonLat([extent[0],extent[1]])
      var transformedCoordinatesSE = toLonLat([extent[2],extent[3]])
      setCoordinatesOnDisplay([
        transformedCoordinatesNW[0],
        transformedCoordinatesNW[1],
        transformedCoordinatesSE[0],
        transformedCoordinatesSE[1]
      ])
    }
  },[coordinatesDisplayMode])
  
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

  map.on('singleclick', (e) => {

      const viewResolution = (map.getView().getResolution());

      var mapLayers = map
        .getAllLayers()
        .filter(layer => layer.get('name') !== 'selectedFeatures' && layer.get('name') !== 'react-geo_measure')
  
      if (mapLayers[0]) {
  
        var source = mapLayers[0].getSource() as TileWMS
  
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
    }
  );

  map.on('moveend', (e) => {

    if(coordinatesDisplayMode === 'centro') {

      var transformedCoordinates = toLonLat(map.getView().getCenter()!)
      setCoordinatesOnDisplay(transformedCoordinates)
    } else if(coordinatesDisplayMode === 'bbox') {

      var extent = map.getView().calculateExtent()
      var transformedCoordinatesNW = toLonLat([extent[0],extent[1]])
      var transformedCoordinatesSE = toLonLat([extent[2],extent[3]])
      setCoordinatesOnDisplay([
        transformedCoordinatesNW[0],
        transformedCoordinatesNW[1],
        transformedCoordinatesSE[0],
        transformedCoordinatesSE[1]
      ])
    }
  })

  map.on('pointermove', (e) => {

    if(e.coordinate && coordinatesDisplayMode === 'mouse') {
      var transformedCoordinates = toLonLat(e.coordinate)
      setCoordinatesOnMouse(transformedCoordinates)
    }
  })

  function switchLeftPanel() {

    setdisplayLeftSidePanel(!displayLeftSidePanel)
  }

  function switchRightPanel() {

    setdisplayRightSidePanel(!displayRightSidePanel)
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
  
    function selectedStyle(feature: any) {

      if(feature.getGeometry().getType() === 'Point') {

        return new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: "rgba(255, 208, 0, 0.35)",
            }),
            stroke: new Stroke({
              color: "rgb(255, 208, 0)",
              width: 3,
            }),
          })
        })
      } else {

        return new Style({
          stroke: new Stroke({
            color: "rgb(255, 208, 0)",
            width: 3,
          }),
          fill: new Fill({
            color: "rgba(255, 208, 0, 0.35)",
          }),
        })
      }
    }

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

  function switchCoordinatesDisplayMode() {

    var d = coordinatesDisplayMode
    if(d === 'centro') {

      setCoordinatesDisplayMode('mouse')
    } else if(d === 'mouse') {

      setCoordinatesDisplayMode('bbox')
    } else {

      setCoordinatesDisplayMode('centro')
    }
  }

  return ( 
    <>
      <Container>
        <LeftSidePanel display={displayLeftSidePanel}>
          <InfoPanel 
            features={features} 
            isLoading={isLoadingInfoPanel}
            map={map}
          />
        </LeftSidePanel>
        <MiddlePanel>
          <LeftSidePanelSwitcher onClick={switchLeftPanel}>
              {(displayLeftSidePanel)? (<FaCaretLeft/>) : (<FaCaretRight/> )}
          </LeftSidePanelSwitcher>
          <ButtonsContainer>
            <MapButton 
              onClick={() => setIsEnabledToolbox(!isEnabledToolbox)}
            >
              <FaToolbox/>
            </MapButton>
            <Toolbox display={isEnabledToolbox}>
              <MapButton>
                <MeasureButton
                  name="distance"
                  map={map}
                  measureType="line"
                  clickToDrawText='Clique para medir uma distância'
                  continueLineMsg='Clique para medir uma distância'
                  icon={
                    <FaRulerCombined/>
                  }
                  pressedIcon={
                    <FaRulerCombined color='green'/>
                  }
                  multipleDrawing
                >
                </MeasureButton>
              </MapButton>
              <MapButton>
                <MeasureButton
                  name="area"
                  map={map}
                  measureType="polygon"
                  icon={
                    <FaDrawPolygon/>
                  }
                  pressedIcon={
                    <FaDrawPolygon color='green'/>
                  }
                  clickToDrawText='Clique para medir uma área'
                  continuePolygonMsg='Clique para medir uma área'
                  multipleDrawing>
                </MeasureButton>
              </MapButton>
            </Toolbox>
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
          <RightSidePanelSwitcher onClick={switchRightPanel}>
              {(displayRightSidePanel)? (<FaCaretRight/> ) : (<FaCaretLeft/>)}
          </RightSidePanelSwitcher>
        </MiddlePanel>
        <RightSidePanel display={displayRightSidePanel}>
            <PanoramicViewer></PanoramicViewer>
        </RightSidePanel>
      </Container>
      <Footer>
        <VersionContainer>
          webgis-itabirito:v.{pj.version} &nbsp; <a style={{color: 'inherit'}} href='https://github.com/paschendale/webgis-itabirito' target={'_blank'} rel="noreferrer"><span style={{color: 'inherit'}}><FaGithub/></span></a>
        </VersionContainer>
        <CoordinatesContainer>
          <HiOutlineSwitchVertical style={{cursor: 'pointer'}} onClick={() => switchCoordinatesDisplayMode()}/>
          &nbsp;
          <Coordinates coordinatesOnDisplay={coordinatesOnDisplay!} coordinatesOnMouse={coordinatesOnMouse!} coordinatesDisplayMode={coordinatesDisplayMode}/>
        </CoordinatesContainer>
      </Footer>
      <ToastContainer />
    </>
  );
}

export default Map;