import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { LoadingPlaceHolder } from './styles';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import { Circle, Fill, Stroke, Style } from "ol/style.js";
import Point from 'ol/geom/Point';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useQuery } from "@tanstack/react-query";

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

type PanoramicViewerProps = {
    coords: Array<number>,
    map: OlMap
}

export default function PanoramicViewer({coords, map}: PanoramicViewerProps) {
    const[azimuth,setAzimuth] = useState<number>()
    const[azimuthDefault,setAzimuthDefault] = useState<number>()
    const[azimuthClick,setAzimuthClick] = useState<number>()
    const[pitch,setPitch] = useState<number>(0)
    const[zoom,setZoom] = useState<number>(0)

    const { data: panoramaData, isLoading, isSuccess } = useQuery({
        queryKey: [`/360/${coords[0]}/${coords[1]}`],
        queryFn: getPanorama,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });

    async function getPanorama() {

        clearPanoramaLayers()

        if(coords[0] !== 0 && coords[1] !== 0) {

            map.addLayer(buildMarkerLayer(coords))

            try {
                
                let panoramas = await api.get(`/360/${coords[0]}/${coords[1]}`)

                return panoramas.data
            } catch (error) {
                
                throw new Error(JSON.stringify(error))
            }
        } else {
            return {}
        }
    }

    function clearPanoramaLayers() {

        var mapLayers = map
        .getAllLayers()
        .filter(layer => layer.get('name') === 'markerLayer' ||  layer.get('name') === 'triangleLayer')
    
        if(mapLayers.length !== 0) {
            
            mapLayers.forEach(layer => map.removeLayer(layer))
        }
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

        if(panoramaData && coords[0] !== 0 && coords[1] !== 0 && isSuccess) {
    
            setAzimuthClick( 
                keepItLessThan360(panoramaData.azimuth_to_click * 180 / Math.PI) 
                )
            setAzimuthDefault( 
                keepItLessThan360 (panoramaData.azimuth_to_click * 180 / Math.PI)
            );
            setAzimuth( 
                keepItLessThan360 (panoramaData.azimuth_to_click * 180 / Math.PI) 
            )
            
            // console.log(`O panorama está a ${panoramaData.distance_to_click} metros, tomado com azimute ${panoramaData.azimuth}`, panoramaData)
            map.addLayer(buildMarkerLayer([panoramaData.x,panoramaData.y],'pano'))
        }
    },[panoramaData])

    function calculateTriangleCoords(anchor: Array<number>, base: number, height: number, rotation: number) {
        const phi = (rotation * Math.PI) / 180; // Convert rotation to radians

        if (Math.abs(base) > height) {
            base = height
        }
    
        const Xa = anchor[0];
        const Ya = anchor[1];

        const t = Math.atan(base / (2 * height) )

        const l = base / (2 * Math.sin(t))

        const X1 = Xa + l * Math.sin(phi - t)
        const Y1 = Ya + l * Math.cos(phi - t)
        const X2 = Xa + l * Math.sin(phi + t)
        const Y2 = Ya + l * Math.cos(phi + t)

        // console.log(`
        //     Rotation: ${rotation}
        //     Base: ${base}
        //     Height: ${height}
        //     Rotation (phi): ${phi}
        //     t: ${t}
        //     l: ${l}
        //     Xa: ${Xa}
        //     Ya: ${Ya}
        //     X1: ${X1}
        //     Y1: ${Y1}
        //     X2: ${X2}
        //     Y2: ${Y2}
        // `)
    
        return [[Xa, Ya], [X1, Y1], [X2, Y2], [Xa, Ya]];
      };

    useEffect(() => {

        if (panoramaData && azimuth && azimuthClick && azimuthDefault) {

            const triangleStyle = new Style({
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                })
            });
        
            const triangleLayer = new VectorLayer({
                source: new VectorSource({
                    features: [new Feature(new Polygon([
                        calculateTriangleCoords(
                            [panoramaData.x,panoramaData.y], 
                            (20/(1-Math.abs(pitch)))*(120-zoom)/120, 30, 
                            azimuthClick + (azimuth - azimuthDefault) + Number(panoramaData.azimuth)
                        )
                    ]))]
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
            // zoom: ${zoom} & pitch: ${pitch}
            // panoramaData.azimuth: ${panoramaData.azimuth}
            // panoramaData.azimuthToClick: ${ keepItLessThan360 (panoramaData.azimuth_to_click * 180 / Math.PI) }
            // Current panorama azimuth: ${azimuth}
            // AzimuthDefault: ${azimuthDefault}
            // AzimuthClick: ${azimuthClick}`)
        }

    },[azimuthDefault,zoom,pitch])

    if (coords[0] === 0 && coords[1] === 0) {
        return (
            <LoadingPlaceHolder>
               Nenhum panorama selecionado
            </LoadingPlaceHolder>
        )
    } else if (isLoading || (isSuccess && !panoramaData) || !azimuthDefault) {
        return (
            <LoadingPlaceHolder>
                Carregando...
            </LoadingPlaceHolder>
        )
    } else if (isSuccess && azimuthDefault) {
        return (
            <div className="container-photo-sphere">
                <ReactPhotoSphereViewer 
                    onPositionChange={(lat,lng) => {
                        setAzimuth(lng * 180 / Math.PI)
                        setPitch(lat)
                    }}
                    onZoomChange={(e) => {
                        setZoom(e.zoomLevel)
                    }}
                    src={`/api/proxy/${encodeURIComponent(panoramaData.link_foto)}`}
                    defaultYaw={`${keepItLessThan360 (panoramaData.azimuth_to_click * 180 / Math.PI)}deg`}
                    useXmpData={false}
                    defaultZoomLvl={1}
                    height={'calc(100vh - 25px)'} 
                    width={"100%"} 
                    container={'container-photo-sphere'}/>
            </div>
        )
    } else {
        return (
            <LoadingPlaceHolder>
                Erro ao carregar panorama
            </LoadingPlaceHolder>
        )
    }
}