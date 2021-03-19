import React, { useEffect, useState } from 'react';
import './Home.css';
import servicesData from '../../fakeData/fakeData.json';
import { Row } from 'react-bootstrap';
import ServiceCard from '../ServiceCard/ServiceCard';
const Home = () => {
  const background = {
    backgroundImage: `url("https://i.ibb.co/9p8pDp4/Bg.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices(servicesData);
  }, []);
  console.log(services);
  return (
    <div style={background}>
      <Row>
        {services.map((service) => (
          <ServiceCard service={service}></ServiceCard>
        ))}
      </Row>
    </div>
  );
};

export default Home;
