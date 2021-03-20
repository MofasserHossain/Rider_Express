import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import ServiceData from '../../fakeData/fakeData.json';
import DestinationMap from '../DestinationMap/DestinationMap';
import './PickDestination.css';
import ServiceInformation from '../ServiceInformation/ServiceInformation';

const PickDestination = () => {
  const [searchPlace, setSearchPlace] = useState({
    from: '',
    to: '',
  });
  const [togglePlace, setTogglePlace] = useState(true);
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
  const handleSearchPlace = (e) => {
    const searchPlaces = { ...searchPlace };
    searchPlaces[e.target.name] = e.target.value;
    setSearchPlace(searchPlaces);
  };

  return (
    <>
      <Container className="pt-3 border-top-2">
        <Row>
          <Col md={4}>
            {togglePlace ? (
              <div className="form-card">
                <h4>Pick Form</h4>
                <input
                  onBlur={handleSearchPlace}
                  type="text"
                  name="from"
                  required
                  placeholder="Select Your Place"
                />
                <h4 className="mt-3">Pick to</h4>
                <input
                  onBlur={handleSearchPlace}
                  type="text"
                  name="to"
                  required
                  placeholder="Select Your Place"
                />
                <button
                  onClick={() => setTogglePlace(!togglePlace)}
                  className="btn w-100 mt-3 color btn-submit"
                >
                  Search
                </button>
              </div>
            ) : (
              <ServiceInformation place={searchPlace} rideInfo={rideInfo} />
            )}
          </Col>
          <Col md={8}>
            <DestinationMap />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PickDestination;
