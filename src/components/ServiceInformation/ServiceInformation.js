import React from 'react';

const ServiceInformation = ({ category, place }) => {
  console.log(category);
  const { from, to } = place;
  return (
    <div>
      <h3>form {from}</h3>
      <h3>To {to}</h3>
      {category &&
        category.map((categoryData) => (
          <div key={categoryData.id}>
            <span>{categoryData.seat}</span>{' '}
            <span>{categoryData.categoryName}</span>
          </div>
        ))}
    </div>
  );
};

export default ServiceInformation;
