import { getParkings, getZones, getVehicles } from '../../services/backend';
import { NextApiRequest, NextApiResponse } from 'next';
import findInZone from '@turf/boolean-point-in-polygon';
import { size, sumBy } from 'lodash';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const parkings = await getParkings();
        const zones = await getZones();
        const vehicles = await getVehicles();

        const cars = vehicles.filter(({ model: { type } }) => type === 'car');
        const totalCars = cars.length;

        const carsInZones = cars.map(({ locationLongitude, locationLatitude }) => {
            return zones.find(zone => {
                return findInZone([locationLongitude, locationLatitude], zone.geom.geometry)
            })?.name;
        });

        const parkingsInZones = parkings.map(({ longitude, latitude, slots }) => {
            const zoneName = zones.find(zone => {
                return findInZone([longitude, latitude], zone.geom.geometry)
            })?.name;
            return { zoneName, slots }
        });

        const zonesWithResults = zones.map((zone) => {

            const cars = size(carsInZones.filter(item => item === zone.name));
            const carsPercentage = cars / totalCars;

            const parkingsInZone = parkingsInZones.filter(item => item.zoneName === zone.name);
            const slots = sumBy(parkingsInZone, (item) => item.slots);

            return { ...zone, slots, cars, carsPercentage };
        });

        res.status(200).json({
            parkings, cars, zones: zonesWithResults
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}
