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
  const [searchResult, setSearchResult] = useState(true);
  const [rideInfo, setRideInfo] = useState([]);
  const { serviceName } = useParams();
  useEffect(() => {
    const findServiceData = ServiceData.find(
      (service) => service.name === serviceName
    );
    // console.log(findServiceData);
    setRideInfo(findServiceData);
  }, [serviceName]);
  console.log(rideInfo);
  const handleSearchPlace = (e) => {
    const searchPlaces = { ...searchPlace };
    searchPlaces[e.target.name] = e.target.value;
    setSearchPlace(searchPlaces);
    // console.log('se', searchPlace);
  };

  const background = {
    background: `url("https://i.ibb.co/wBMM72t/Map.png")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    borderRadius: '5px',
  };

  return (
    <>
      <Container className="pt-3 border-top-2">
        <Row>
          <Col md={4}>
            {searchResult ? (
              <div className="form-card">
                <h4>Pick Form</h4>
                <form onSubmit={() => setSearchResult(!searchResult)}>
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
                    type="submit"
                    className="btn w-100 mt-3 color btn-submit"
                  >
                    Search
                  </button>
                </form>
              </div>
            ) : (
              <ServiceInformation place={searchPlace} rideInfo={rideInfo} />
            )}
          </Col>
          <Col md={8} className="map">
            {searchResult ? (
              <div style={background}></div>
            ) : (
              <DestinationMap searchPlace={searchPlace} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PickDestination;
