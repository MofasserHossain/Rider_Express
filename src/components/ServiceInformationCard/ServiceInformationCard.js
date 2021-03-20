import React from 'react';
import './ServiceInformationCard.css';
const ServiceInformationCard = ({ categoryData, img }) => {
  const { seat, categoryName, hirePrice } = categoryData;
  return (
    <div className="infoCard">
      <div>
        <img src={img} alt={categoryName} />
        <span> {categoryName}</span>
        <img
          className="icons ml-3"
          src="https://i.ibb.co/cXmKD8q/peopleicon.png"
          alt={categoryName}
        />
        <span>{seat}</span>
      </div>
      <span>{hirePrice} $</span>
    </div>
  );
};

export default ServiceInformationCard;
