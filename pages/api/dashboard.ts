import { getParkings, getZones, getVehicles } from '../../services/backend';
import { NextApiRequest, NextApiResponse } from 'next';
import findInZone from '@turf/boolean-point-in-polygon';
import { orderBy, replace, size, sortBy, sumBy } from 'lodash';
import { ZoneExtended } from '../../schema';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const parkings = await getParkings();
        const zones = await getZones();
        const vehicles = await getVehicles();

        // Using name as an identifier since no type is provided with a basic clean up.
        const carZones = zones.filter(zone => zone.name.includes('car'))
            .map(zone => ({ ...zone, name: replace(zone.name, 'car ', '') }));

        const cars = vehicles.filter(({ model: { type } }) => type === 'car');
        const totalCars = cars.length;

        const carsInZones = cars.map(({ locationLongitude, locationLatitude }) => {
            return carZones.find(zone => {
                return findInZone([locationLongitude, locationLatitude], zone.geom.geometry)
            })?.name;
        });

        const parkingsInZones = parkings.map(({ longitude, latitude, slots }) => {
            const zoneName = carZones.find(zone => {
                return findInZone([longitude, latitude], zone.geom.geometry)
            })?.name;
            return { zoneName, slots }
        });

        const zonesWithResults = carZones.map((zone) => {

            const cars = size(carsInZones.filter(item => item === zone.name));
            const carsPercentage = cars / totalCars;

            const parkingsInZone = parkingsInZones.filter(item => item.zoneName === zone.name);
            const slots = sumBy(parkingsInZone, (item) => item.slots);

            return { ...zone, slots, cars, carsPercentage } as ZoneExtended;
        });

        res.status(200).json({
            parkings, cars, zones: orderBy(zonesWithResults, 'cars', 'desc')
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}
