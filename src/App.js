import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import './App.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Card from "./Card";

function App() {

  return (
    <div className="App">
      <Map
        mapLib={maplibregl}
        mapStyle="https://tiles.pvduc.dev/light.json"
      >
        <Source type="geojson" id="vessels" data="https://gis-be-production.up.railway.app/vessels?perPage=1000">
          <Layer
            type="symbol"
            id="vessels"
            layout={{
              'icon-image': 'vessel',
              'icon-allow-overlap': true,
            }}
          />
          <Card/>
        </Source>
      </Map>
    </div>
  );
}

export default App;
