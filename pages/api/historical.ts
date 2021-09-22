import { getParkings, getZones, getVehicles } from '../../services/backend';
import { NextApiRequest, NextApiResponse } from 'next';
import findInZone from '@turf/boolean-point-in-polygon';
import { orderBy, random, range, replace, size, sortBy, sumBy } from 'lodash';
import { HistoricalData, ZoneExtended, ZoneResultsBase } from '../../schema';
import { fetchData, generateResults } from './dashboard';

function generateHourlyRange(numberOfHours: number): Date[] {
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();
    const h = new Date().getHours();
    const date = new Date(y, m, d, h, 0, 0, 0);
    return range(numberOfHours).map(item =>
        new Date(
            new Date(date)
                .setHours(
                    new Date().getHours() - item
                )
        )
    );
}

function generateRandomRange(value: number) {
    return random(value / 2, value);
}

const DEFAULT_HOURLY_RANGE = 6;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { parkings, zones, cars } = await fetchData();
        const zonesWithResults = generateResults({ parkings, zones, cars });

        // As an example, we will use 6 hours range.
        const historicalRange = generateHourlyRange(DEFAULT_HOURLY_RANGE)
        
        const historicalResults = zonesWithResults.map(zone => {
            return {
                zone:zone.name, data: historicalRange.map(date => ({
                    date,
                    cars: generateRandomRange(zone.cars),
                    slots: generateRandomRange(zone.slots),
                    carsPercentage: generateRandomRange(zone.carsPercentage),
                })) as ZoneResultsBase[]
            }
        }) as HistoricalData[]

        res.status(200).json(historicalResults);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}
