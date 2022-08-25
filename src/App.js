import * as React from 'react';
import {useEffect, useState} from 'react';
import Map, {Layer, Source} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import './App.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Card from "./Card";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    "type": "FeatureCollection",
    "features": []
  });
  useEffect(() => {
    getGeojson();
  }, [])

  async function getGeojson(numOfPoint = 1000) {
    const {data} = await axios.get('https://gis-be-production.up.railway.app/vessels', {
      params: {
        perPage: numOfPoint
      }
    })
    setData(data)
  }

  return (
    <div className="App">
      <Map
        mapLib={maplibregl}
        mapStyle="https://tiles.pvduc.dev/light.json"
      >
        <Source type="geojson" id="vessels" data={data}>
          <Card/>
          <Layer
            type="symbol"
            id="vessels"
            layout={{
              'icon-image': 'vessel',
              'icon-allow-overlap': true,
            }}
          />
        </Source>
      </Map>
    </div>
  );
}

export default App;
