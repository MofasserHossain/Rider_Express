import React from 'react';
import ServiceInformationCard from '../ServiceInformationCard/ServiceInformationCard';
import './ServiceInformation.css';
const ServiceInformation = ({ rideInfo, place }) => {
  const { from, to } = place;
  const { category, url } = rideInfo;
  return (
    <>
      <div className="bg">
        <div className="timeline">
          <div className="containerDiv">
            <div className="contain">
              <h5>{from}</h5>
            </div>
          </div>
          <div className="containerDiv ">
            <div className="contain left">
              <h5>{to}</h5>
            </div>
          </div>
        </div>
      </div>
      {category &&
        category.map((categoryData) => (
          <ServiceInformationCard
            key={categoryData.id}
            categoryData={categoryData}
            img={url}
          ></ServiceInformationCard>
        ))}
    </>
  );
};

export default ServiceInformation;
