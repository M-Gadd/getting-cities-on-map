import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Map from "./Map";

// import useAddressPredictions from "../Hooks/useAddessPredictions";
export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [location, setLocation] = useState("");
  const [mapInfo, setMapInfo] = useState("");

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
              setMapInfo(location);
              setLocation("");
            }}
            className="ml-2 btn-danger"
          >
            Get Current
          </Button>
        </div>

        <div>{mapInfo && <Map location={mapInfo} />}</div>
      </Col>
    </Row>
  );
};

export default Home;
