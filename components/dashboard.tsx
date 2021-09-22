import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngTuple, Polygon as PolygonType } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import { useGeolocation } from 'react-use';
import { Dashboard as DashboardProps, ZoneExtended } from '../schema';
import { treeIteratee } from "../utils";
import { ExclamationCircle } from "heroicons-react";
import Controls from "./controls";
import { locationIcon, parkingIcon, redCarIcon } from "./icons";

const Dashboard: React.FunctionComponent<{ data: DashboardProps, activeZone: ZoneExtended }> = ({ data, activeZone }) => {
  const [zonesRefs] = useState<Map<string, PolygonType<any>>>(new Map());
  const [center, setCenter] = useState<LatLngTuple>();
  const { zones, parkings, cars } = data;
  const { loading: loadingUserGeoLocation, latitude, longitude, error } = useGeolocation();
  
  useEffect(() => {
    if (latitude && longitude) {
      setCenter([latitude, longitude])
    }
  }, [latitude, longitude]);

  return (
      <div className="grid w-full h-full col-span-3 place-items-center">

        {loadingUserGeoLocation && <div>Loading your location 🅿️ 🅿️ 🅿️ </div>}

        {!loadingUserGeoLocation && error && <div className="grid gap-3 place-items-center">
          <ExclamationCircle className="w-12 h-12 text-yellow-700" />
          <div className="text-xl font-bold">{error.message}</div>
          <div>To use the service, please allow to use your geolocation and refresh the page!</div>
        </div>}

        {!loadingUserGeoLocation && !error && data && center && (
          <MapContainer className="w-full h-full" center={center} zoom={10}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            <Controls activeZone={activeZone} zonesRefs={zonesRefs} />

            <Marker icon={locationIcon} position={center}></Marker>

            {cars.map(({ name, locationLatitude, locationLongitude }, index) =>
              <Marker key={index} icon={redCarIcon} position={[locationLatitude, locationLongitude]}>
                <Tooltip sticky> {name} </Tooltip>
              </Marker>
            )}

            {parkings.map(({ name, latitude, longitude }, index) =>
              <Marker key={index} icon={parkingIcon} position={[latitude, longitude]}>
                <Tooltip sticky> {name} </Tooltip>
              </Marker>
            )}

            {zones.map((zone, index) => <Polygon
              ref={ref => zonesRefs.set(zone.name, ref)}
              key={index}
              pathOptions={{ color: '#ff2e63', weight: 1 }}
              positions={treeIteratee(zone.geom.geometry.coordinates) as any}>
            </Polygon>)}
          </MapContainer>)}
      </div>
    );
}
export default Dashboard;