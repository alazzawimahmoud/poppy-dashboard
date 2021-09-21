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
import ZoneItem from "./zone-item";

const Dashboard: React.FunctionComponent<{ data: DashboardProps }> = ({ data }) => {
  const [zonesRefs] = useState<Map<string, PolygonType<any>>>(new Map());
  const [activeZone, setActiveZone] = useState<ZoneExtended>();
  const [center, setCenter] = useState<LatLngTuple>();
  const { zones, parkings, cars } = data;
  const { loading: loadingUserGeoLocation, latitude, longitude, error } = useGeolocation();
  
  useEffect(() => {
    if(latitude && longitude) {
      setCenter([latitude, longitude])
    }
  }, [latitude, longitude]);
  
  return (
    <div className="flex flex-col-reverse w-screen h-screen overflow-hidden lg:grid lg:grid-cols-4 place-items-center">

      <div className="grid content-start w-full h-full gap-5 p-4 overflow-hidden overflow-y-auto justify-items-center">

        <h2 className="text-3xl font-bold leading-tight text-cool-gray-900">Poppy dashboard 🚗</h2>

        <div className="grid w-full gap-2 place-self-start">
          {zones
            .map((zone, index) =>
              <ZoneItem key={index} zone={zone} onClick={() => setActiveZone(zone)} />
            )}
        </div>

      </div>

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
    </div >);
}
export default Dashboard;