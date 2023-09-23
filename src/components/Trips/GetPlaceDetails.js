import { GOOGLE_MAPS_API_KEY } from '../Export/Export';

const getPlaceDetails = async (placeName) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeName}&fields=name,photos&key=${GOOGLE_MAPS_API_KEY}`);
  const data = await response.json();
  console.log(data);
  return data;
};

export default getPlaceDetails;
