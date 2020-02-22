import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import { useData } from "../Hooks/useData";
import { Card, Row, Col } from "reactstrap";
// import Span from "./UI/Span";

export interface MapProps {
  location: string;
}

const MapsKepy = process.env.REACT_APP_GOOGLE_API;

const Map: React.SFC<MapProps> = ({ location }) => {
  const { lat, lng, isLoading, cities, temp } = useData(location);
  const { ref, map, google } = useGoogleMaps(MapsKepy!, {
    center: { lat, lng },
    zoom: 7,
  });

  const fetchMap = () => {
    if (!isLoading && cities) {
      map.setCenter({ lat, lng });
      map.setZoom(11);

      cities.forEach((one: any, i: number) => {
        let marker = new google.maps.Marker({
          map,
          position: { lat: Number(one.lat), lng: Number(one.lng) },
          title: one.name,
          icon:
            i === 0
              ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });
      });
    }

    return (
      <div className=" ml-4 mx-6" ref={ref} style={{ width: "80vw", height: "70vh" }} />
    );
  };

  return (
    <div className="mt-3">
      <Row>
        {cities &&
          temp &&
          cities.map((city: any, i: number) => (
            <Col>
              <Card className="p3 mt-2 card-hover">
                <div className="p-2">
                  <h4>{city.name}</h4>
                  <p>{`Population: ${city.population}`}</p>
                  <p>{`Distance: ${city.distance}`}</p>
                  <p>{temp && `Temp: ${temp[i][city.name]}`}</p>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      <Row className="mt-3 ">
        <Col xs={5}>{fetchMap()}</Col>
      </Row>

      <style>
        {`
          .card-hover:hover,
          .card-hover:focus {
                      cursor: pointer;
                      transform: translateY(-1px);
                      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                    }
        `}
      </style>
    </div>
  );
  // }
};

export default Map;
