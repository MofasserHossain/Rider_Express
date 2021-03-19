import React from 'react';
import './ServiceCard.css';
import { Col } from 'react-bootstrap';

const ServiceCard = (props) => {
  const { name, url } = props.service;
  return (
    <Col lg={3} md={6}>
      <div className="serviceCard">
        <img src={url} alt={name} />
        <h2 className="mt-2">{name}</h2>
      </div>
    </Col>
  );
};

export default ServiceCard;
