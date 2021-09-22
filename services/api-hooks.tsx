import { Dashboard, HistoricalData } from "../schema";
import { createDataHook, getData } from "./methods";

export async function getDashboard() {
    return getData<Dashboard>('dashboard');
}
export async function getHistory() {
    return getData<HistoricalData[]>('historical');
}

export const useDashboard = createDataHook(getDashboard);
export const useHistory = createDataHook(getHistory);
