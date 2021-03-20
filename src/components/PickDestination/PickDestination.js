import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ServiceData from '../../fakeData/fakeData.json';

const PickDestination = () => {
  const [rideInfo, setRideInfo] = useState([]);
  const { serviceName } = useParams();
  useEffect(() => {
    const findServiceData = ServiceData.find(
      (service) => service.name === serviceName
    );
    console.log(findServiceData);
    setRideInfo(findServiceData);
  }, [serviceName]);
  console.log(rideInfo);
  const { category, name } = rideInfo;
  console.log(category);
  return (
    <div>
      <h3>{name}</h3>
      {category &&
        category.map((categoryData) => (
          <ul key={category.id}>
            <li>{categoryData.categoryName}</li>
            <li>{categoryData.hirePrice}</li>
          </ul>
        ))}
    </div>
  );
};

export default PickDestination;
