import { Polygon } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { ZoneExtended } from "../schema";

interface ControlsProps { activeZone: ZoneExtended, zonesRefs: Map<string, Polygon<any>> }
function Controls({ activeZone, zonesRefs }: ControlsProps) {
  const map = useMap();
  useEffect(() => {
    if (activeZone) {
      map.flyToBounds(zonesRefs.get(activeZone.name).getBounds());
    }
  }, [activeZone])
  return null;
}

export default Controls;