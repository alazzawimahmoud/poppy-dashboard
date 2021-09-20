import axiosApi from './api-client';
import { Parking, Zone, Vehicle } from '../schema';

export async function getParkings() {
    const { data: parkings } = await axiosApi.get<Parking[]>('/v2/parkings');
    return parkings;
}
export async function getZones() {
    const { data: zones } = await axiosApi.get<{ zones: Zone[]}>('/v2/zones');
    return zones.zones;
}
export async function getVehicles() {
    const { data: vehicles } = await axiosApi.get<Vehicle[]>('/v2/vehicles');
    return vehicles;
}
