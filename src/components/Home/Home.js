import React, { useEffect, useState } from 'react';
import './Home.css';
import servicesData from '../../fakeData/fakeData.json';
import { Container, Row } from 'react-bootstrap';
import ServiceCard from '../ServiceCard/ServiceCard';
const Home = () => {
  const background = {
    backgroundImage: `url("https://i.ibb.co/9p8pDp4/Bg.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '160px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices(servicesData);
  }, []);
  // console.log(services);
  return (
    <div style={background}>
      <Container>
        <Row>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service}></ServiceCard>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
