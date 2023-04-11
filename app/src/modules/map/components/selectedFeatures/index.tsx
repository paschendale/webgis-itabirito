import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "proj4";
import "proj4leaflet";

interface SelectedFeaturesProps {
  features: any;
}

export function makeGeojson(features: any): any {

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

const SelectedFeatures = ({ features }: SelectedFeaturesProps) => {
  const map = useMap();
  const [geoJsonLayer, setGeoJsonLayer] = useState<L.GeoJSON>();

  var markerStyle = {
    radius: 5,
    fillColor: "#ffff006c",
    color: "#ffff00",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.5
  };

  useEffect(() => {

    if (geoJsonLayer) {
      map.removeLayer(geoJsonLayer);
    }
    
    const newGeoJsonLayer = L.Proj.geoJson(makeGeojson(features), {
      style: {
        color: "#ffff00",
        fillColor: "#ffff006c",
        weight: 3,
      },
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, markerStyle);
      }
    });

    newGeoJsonLayer.addTo(map);
    setGeoJsonLayer(newGeoJsonLayer); 
    
    const bounds = newGeoJsonLayer.getBounds();
    if (bounds.isValid()) {
      map.flyToBounds(bounds);
    }

    return () => {
      if (newGeoJsonLayer) {
        map.removeLayer(newGeoJsonLayer);
      }
    };
  }, [features, map]);

  return null;
};

export default SelectedFeatures;