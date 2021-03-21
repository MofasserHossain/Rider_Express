import React, { useEffect, useState } from 'react';

const DestinationMap = (props) => {
  console.log('se', props);
  const { from } = props.searchPlace;
  const [map, setMap] = useState({});
  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${from}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyCviXo-YjgT1jnOEEDOsikg5U2iewyiFsw`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMap(data))
      .catch((error) => console.log(error));
  }, [from]);

  const background = {
    background: `url("https://i.ibb.co/wBMM72t/Map.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    borderRadius: '5px',
  };
  return (
    <div>
      {map.images ? <div>{map.img}</div> : <div style={background}> </div>}
    </div>
  );
};

export default DestinationMap;
