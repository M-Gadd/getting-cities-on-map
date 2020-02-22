import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Map from "./Map";
import axios from "axios";

// import useAddressPredictions from "../Hooks/useAddessPredictions";
export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [location, setLocation] = useState("");
  const [mapInfo, setMapInfo] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  let initialLat;
  let initialLng;

  const getNavigator = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        initialLat = position.coords.latitude;
        initialLng = position.coords.longitude;
        getCurrent(initialLat, initialLng);
      });
    }
  };

  const getCurrent = async (lat: any, lng: any) => {
    const citiesAround = await axios.get(
      `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&cities=cities15000&radius=200&maxRows=4&username=${"mgad"}`,
    );
    if (citiesAround) {
      console.log("HERE", citiesAround.data.geonames[0].name);
      setCurrentLocation(citiesAround.data.geonames[0].name);
    }
  };

  return (
    <Row
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          setMapInfo(location);
          setLocation("");
        }
      }}
    >
      <Col xs={12}>
        <div className="mt-3">
          <input
            style={{ width: "60vw" }}
            value={location}
            onChange={(event) => {
              setMapInfo("");
              setCurrentLocation("");
              setLocation(event?.target.value);
            }}
            type="text"
            placeholder="please enter location"
          />

          <Button
            onClick={() => {
              setMapInfo(location);
              setLocation("");
            }}
            className="ml-2  btn-dark"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              getNavigator();
              setMapInfo(location);
              setLocation("");
            }}
            className="ml-2 btn-danger"
          >
            Get Current
          </Button>
        </div>

        <div>
          {(mapInfo || currentLocation) && (
            <Map location={mapInfo ? mapInfo : currentLocation ? currentLocation : ""} />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
