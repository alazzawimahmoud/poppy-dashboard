import { MultiPolygon } from "@turf/helpers";

export interface VehicleModel {
    energy: string;
    energyCapacity: number;
    name: string;
    type: string;
    uuid: string;
    gearbox: string;
}

export interface Vehicle {
    uuid: string;
    name: string;
    unlockFee: number;
    pauseUnitPrice: number;
    overKilometerPrice: number;
    status: string;
    plate: string;
    moveUnitPrice: number;
    locationLatitude: number;
    locationLongitude: number;
    autonomy: number;
    bookUnitPrice: number;
    dayCapPrice: number;
    includedKilometers: number;
    discountPercent: number;
    bookUnitPriceNet: number;
    dayCapPriceNet: number;
    moveUnitPriceNet: number;
    overKilometerPriceNet: number;
    pauseUnitPriceNet: number;
    unlockFeeNet: number;
    model: VehicleModel;
}

export interface Zone {
    name: string;
    geom: Geom;
}

export interface Geom {
    type: string;
    geometry: MultiPolygon;
    properties: Properties;
}
export interface Properties {
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface Parking {
    id: number;
    uuid: string;
    name: string;
    longitude: number;
    latitude: number;
    address: null;
    slots: number;
    payingZone: null;
    hasPlateScan: boolean;
    description: string;
}
