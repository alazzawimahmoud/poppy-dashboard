import { Dashboard } from "../schema";
import { createDataHook, getData } from "./methods";

export async function getDashboard() {
    return getData<Dashboard>('dashboard');
}
export const useDashboard = createDataHook(getDashboard);
