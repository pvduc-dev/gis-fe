import React, {useEffect, useState} from 'react';
import {useMap} from "react-map-gl";
import axios from "axios";

const Card = () => {
  const [numOfVessel, setNumOfVessel] = useState('');
  const { current: map} = useMap();
  useEffect(() => {
    map?.loadImage('/vessel.png', (error, result) => {
      map.addImage('vessel', result);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function inputChangeHandler(event) {
    setNumOfVessel(event.target.value);

  }

  async function applyClickHandler() {
    const {data} = await axios.get('https://gis-be-production.up.railway.app/vessels', {
      params: {
        perPage: numOfVessel
      }
    })
    map.getSource('vessels').setData(data);
  }

  return (
    <div className="card">
      <label htmlFor="">Number of vessel</label>
      <input type="text" onChange={inputChangeHandler} value={numOfVessel}/>
      <button onClick={applyClickHandler}>Apply</button>
    </div>
  );
};

export default Card;
