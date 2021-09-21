import { icon, PointExpression } from "leaflet";
import locationDotImage from '../public/images/location-dot.svg';
import redCarImage from '../public/images/red-car.png';
import parkingImage from '../public/images/parking.png';

const iconSize : PointExpression = [20, 20];
export const locationIcon = icon({
  iconUrl: locationDotImage.src,
  iconSize
});

export const redCarIcon = icon({
  iconUrl: redCarImage.src,
  iconSize
});

export const parkingIcon = icon({
  iconUrl: parkingImage.src,
  iconSize
});