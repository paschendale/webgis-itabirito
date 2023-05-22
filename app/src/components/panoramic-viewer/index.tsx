import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { LoadingPlaceHolder } from './styles';
import OlMap from 'ol/Map';

type PanoramicViewerProps = {
    coords: Array<number>,
    map: OlMap
}

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

export default function PanoramicViewer({coords, map}: PanoramicViewerProps) {
    const[panorama,setPanorama] = useState<Array<any>>([])
    const[panoramaUrl,setPanoramaUrl] = useState('')
    const[azimuth,setAzimuth] = useState(0)
    const[isLoading,setIsLoading] = useState(true)

    async function getPanorama() {

        setIsLoading(true)

        let panoramas = await api.get(`/360/${coords[0]}/${coords[1]}`)
        
        return panoramas
    }
    
    useEffect(() => {
        
        if(coords[0] && coords[1]) {
    
            getPanorama()
            .then((data: any) => {
                setPanorama(data.data)
                setIsLoading(false)
            })
        }
    },[coords])

    useEffect(() => {

        if (panorama[0]) {

            const azimuthLote: number = calculateAzimuth(coords, [panorama[0].x, panorama[0].y]);
            setAzimuth(azimuthLote - Number(panorama[0].azimuth));

            if (panorama[0].link_foto !== panoramaUrl) {

                setPanoramaUrl(panorama[0].link_foto)
            }
        }
    },[panorama])
    
    return (
        (isLoading) ? (
            <LoadingPlaceHolder>Carregando...</LoadingPlaceHolder>
        ) : (<div className="container-photo-sphere">
            <ReactPhotoSphereViewer 
                src={panoramaUrl}
                defaultYaw={`${azimuth}deg`}
                useXmpData={false}
                defaultZoomLvl={1}
                height={'calc(100vh - 25px)'} 
                width={"100%"} 
                container={'container-photo-sphere'}/>
        </div>)
    )
}