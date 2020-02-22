import { useEffect, useState } from "react";
import axios from "axios";

export interface UseDataReturn {
  lat?: number;
  lng?: number;
  isLoading: boolean;
  cities?: any[];
  temp?: Array<{
    [name: string]: number;
  }>;
}
const DarkSkyKeyEnv = process.env.REACT_APP_DARK_KEY;
const username = process.env.REACT_APP_GEONAME_USERNAME;
const MapsKepy = process.env.REACT_APP_GOOGLE_API;

// const username = "mgad";s
export const useData = (city: string): UseDataReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [temp, setTemp] = useState();

  // const DarkSkyKey = "71a6f287631629e72c39717206f04695";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${MapsKepy}`,
      );
      if (response) {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        setLat(response.data.results[0].geometry.location.lat);
        setLng(response.data.results[0].geometry.location.lng);
        setIsLoading(false);
        let temperature: any = [];
        let citiesHere: any = [];

        const citiesAround = await axios.get(
          `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&cities=cities15000&radius=200&maxRows=4&username=${username}`,
        );

        if (citiesAround) {
          setCities(citiesAround.data.geonames);
          setIsLoading(false);
          citiesHere = citiesAround.data.geonames;
          for (let i = 0; i < citiesHere.length; i++) {
            const tempp = axios.get(
              `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DarkSkyKeyEnv}/${citiesHere[i].lat},${citiesHere[i].lng}`,
            );

            if (tempp) {
              temperature.push({
                [citiesHere[i].name]: (await tempp).data.currently.temperature,
              });
            }
          }
        }

        if (temperature.length === citiesHere.length) {
          setTemp(temperature);
        }
      }
    };

    fetchData();
  }, [city]);

  return { lat, lng, isLoading, cities, temp };
};
