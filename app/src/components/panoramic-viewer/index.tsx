import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

interface PanoramicViewerProps {
    lat: number;
    lng: number;
}

export default function PanoramicViewer(
    // {lat,lng}: PanoramicViewerProps
    ) {

    return (
        <div className="App">
            <ReactPhotoSphereViewer 
                src="https://topocart.net/img/9/1?foto360=OS911-22_PM-RioBranco/Fotos_JPG/20220830_03/PAN/20220830_03_08216_PAN" 
                height={'100vh'} 
                width={"100%"} 
                container={'App'}/>
        </div>
    )
}