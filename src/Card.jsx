import React, {useEffect, useState} from 'react';
import {useMap} from "react-map-gl";

const Card = () => {
  const [numOfVessel, setNumOfVessel] = useState('');
  const { current: map} = useMap();
  useEffect(() => {
    map?.loadImage('/vessel.png', (error, result) => {
      map.addImage('vessel', result);
    })
  }, [])
  function inputChangeHandler(event) {
    setNumOfVessel(event.target.value)
  }

  function applyClickHandler() {
    map.getSource('vessels').setData(`${process.env.REACT_APP_BACKEND_BASEURL}/vessels?perPage=${numOfVessel}`)
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