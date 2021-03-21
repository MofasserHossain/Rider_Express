import React, { useEffect, useState } from 'react';

const DestinationMap = (props) => {
  console.log('se', props);
  const { from } = props.searchPlace;
  const [map, setMap] = useState({});
  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/output?${from}&key=AIzaSyCviXo-YjgT1jnOEEDOsikg5U2iewyiFsw`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMap(data))
      .catch((error) => {
        setMap(error);
        console.log(error);
      });
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
      {map.error && <h2>map.error</h2>}
      {map.images ? <div>{map.img}</div> : <div style={background}> </div>}
    </div>
  );
};

export default DestinationMap;
