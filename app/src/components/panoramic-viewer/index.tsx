import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { api } from '../../services/api';
import { createRef, useEffect, useState } from 'react';
import { LoadingPlaceHolder } from './styles';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Circle, Fill, Stroke, Style, RegularShape } from "ol/style.js";
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

function keepItLessThan360(angle: number): number {
    if (angle < 0) {
      return angle + 360;
    }
  
    if (angle > 360) {
      return keepItLessThan360(angle - 360);
    } else {
      return angle;
    }
  }

function calculateAzimuth(
    origin: Array<number>,
    destination: Array<number>,
): number {
    const deltaX = origin[0] - destination[0];
    const deltaY = origin[1] - destination[1];

    const rumo = Math.abs((Math.atan(deltaX / deltaY) * 180) / Math.PI);

    if (deltaX > 0 && deltaY > 0) {
        return keepItLessThan360(rumo);
    } else if (deltaX > 0 && deltaY < 0) {
        return keepItLessThan360(180 - rumo);
    } else if (deltaX < 0 && deltaY < 0) {
        return keepItLessThan360(rumo + 180);
    } else if (deltaX < 0 && deltaY > 0) {
        return keepItLessThan360(2 * 180 - rumo);
    } else {
        return 0;
    }
}

type PanoramicViewerProps = {
    coords: Array<number>,
    map: OlMap
}

export default function PanoramicViewer({coords, map}: PanoramicViewerProps) {
    const[panorama,setPanorama] = useState<Array<any>>([])
    const[panoramaUrl,setPanoramaUrl] = useState('')
    const[azimuth,setAzimuth] = useState(0)
    const[azimuthDefault,setAzimuthDefault] = useState(0)
    const[azimuthClick,setAzimuthClick] = useState(0)
    const[pitch,setPitch] = useState(0)
    const[zoom,setZoom] = useState(0)
    const[markerFeature, setMarkerFeature] = useState<Feature>()
    const[isLoading,setIsLoading] = useState(true)

    const photoSphereRef = createRef<any>();
    
    function getLayerById(id: string): any {

        const layers = map.getLayers().getArray();
        const foundLayer = layers.find(layer => layer.get('id') === id);

        return foundLayer
    }

    async function getPanorama() {

        setIsLoading(true)

        let panoramas = await api.get(`/360/${coords[0]}/${coords[1]}`)
        
        return panoramas
    }

    
    function buildMarkerLayer(coords: Array<number>, type?: string) {

        var iconStyle = new Style({
            image: new Circle({
              fill: new Fill({
                color: (type) ? [100,100,100,1] : [24, 114, 255, 1],
              }),
              stroke: new Stroke({
                color: [255, 255, 255, 1],
                width: 2,
              }),
              radius: 8,
            }),
          });
      
          var shadowStyle = new Style({
            image: new Circle({
              fill: new Fill({
                color: "rgba(0,0,0,0.2)",
              }),
              radius: 11,
            }),
          });

        const markerFeature = new Feature({
            geometry: new Point(coords),
        });

        
        markerFeature.setStyle([shadowStyle, iconStyle]);

        const markerLayer = new VectorLayer({
            source: new VectorSource({
                features: [markerFeature]
            }),
            properties: {
                name: 'markerLayer'
            },
            zIndex: 100
        });

        return markerLayer
    }
    
    useEffect(() => {
        
        if(coords[0] && coords[1]) {
            
            setAzimuth(0)

            var mapLayers = map
                .getAllLayers()
                .filter(layer => layer.get('name') === 'markerLayer' ||  layer.get('name') === 'triangleLayer')
            
            if(mapLayers.length !== 0) {
                
                mapLayers.forEach(layer => map.removeLayer(layer))
            }
    
            getPanorama()
            .then((data: any) => {
                setPanorama(data.data)
                setIsLoading(false)
            })

            map.addLayer(buildMarkerLayer(coords))
        }
    },[coords])

    // useEffect(() => {
    //     if (markerFeature) {
    //       getLayerById('markerLayer')?.getSource().clear();
    //       getLayerById('markerLayer')?.addFeature(markerFeature);
    //     }
    //   }, [markerFeature]);

    useEffect(() => {

        if (panorama[0]) {

            setAzimuthClick( calculateAzimuth(coords, [panorama[0].x, panorama[0].y]))
            setAzimuthDefault(keepItLessThan360(360 - Number(panorama[0].azimuth) + azimuthClick));

            if (panorama[0].link_foto !== panoramaUrl) {

                setPanoramaUrl(panorama[0].link_foto)
                console.log(`O panorama está a ${panorama[0].distance_to_click} metros do ponto clicado`, panorama[0])
                map.addLayer(buildMarkerLayer([panorama[0].x,panorama[0].y],'pano'))
            }
        }
    },[panorama])

    function calculateTriangleCoords(anchor: Array<number>, base: number, height: number, rotation: number) {
        const rotationRad = (rotation * Math.PI) / 180; // Convert rotation to radians
    
        const centerX = anchor[0];
        const centerY = anchor[1];
    
        const halfBase = base / 2;
        const halfHeight = height / 2;
    
        const angleRad = Math.atan(halfBase / halfHeight);
    
        const x1 = centerX + Math.cos(rotationRad - angleRad) * halfHeight;
        const y1 = centerY + Math.sin(rotationRad - angleRad) * halfHeight;
        const x2 = centerX + Math.cos(rotationRad + angleRad) * halfHeight;
        const y2 = centerY + Math.sin(rotationRad + angleRad) * halfHeight;
    
        return [[x1, y1], [centerX, centerY], [x2, y2], [x1, y1]];
      };

    useEffect(() => {

        if (panorama[0]) {

            const triangleStyle = new Style({
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                })
            });
        
            const triangleLayer = new VectorLayer({
                source: new VectorSource({
                    features: [new Feature(new Polygon([calculateTriangleCoords([panorama[0].x,panorama[0].y], (20/(1-Math.abs(pitch)))*(120-zoom)/120, 50, azimuthDefault - azimuth + azimuthClick )]))]
                }),
                style: triangleStyle,
                properties: {
                    name: 'triangleLayer'
                },
                zIndex: 9
            });
    
            var mapLayers = map
                .getAllLayers()
                .filter(layer => layer.get('name') === 'triangleLayer')
            
            if(mapLayers.length !== 0) {
                
                mapLayers.forEach(layer => map.removeLayer(layer))
            }
        
            map.addLayer(triangleLayer);
            // console.log(`
            //     zoom: ${zoom} & pitch: ${pitch}
            //     Current azimuth: ${azimuth}
            //     Azimuth Default: ${azimuthDefault}
            //     AzimuthClick: ${azimuthClick}`)
        }

    },[azimuthDefault,zoom,pitch,panorama])
    
    return (
        (isLoading) ? (
            <LoadingPlaceHolder>Carregando...</LoadingPlaceHolder>
        ) : (
            <div className="container-photo-sphere">
                <ReactPhotoSphereViewer 
                    ref={photoSphereRef}
                    onPositionChange={(lat,lng) => {
                        setAzimuth(lng * 180 / Math.PI)
                        setPitch(lat)
                    }}
                    onZoomChange={(e) => {
                        setZoom(e.zoomLevel)
                    }}
                    src={panoramaUrl}
                    defaultYaw={`${azimuthDefault}deg`}
                    useXmpData={false}
                    defaultZoomLvl={1}
                    height={'calc(100vh - 25px)'} 
                    width={"100%"} 
                    container={'container-photo-sphere'}/>
            </div>
        )
    )
}