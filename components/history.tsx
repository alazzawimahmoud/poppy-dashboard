import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useMemo } from 'react';
import { HistoricalData, ZoneResultsBase } from '../schema';
import { AxisOptions, Chart } from "react-charts";

const History: React.FunctionComponent<{ data: HistoricalData[] }> = ({ data }) => {
  const primaryAxis = useMemo(
    (): AxisOptions<ZoneResultsBase> => ({
      getValue: (item) => new Date(item.date),
    }),
    []
  );
  const secondaryAxes = useMemo(
    (): AxisOptions<ZoneResultsBase>[] => [
      {
        getValue: item => item.cars,
      },
    ],
    []
  );
  const chartData = data.map(item => ({
    label: item.zone,
    data: item.data,
  }))
  return (
    <div className="grid w-full h-full col-span-3 place-items-center">
      <Chart
        options={{
          data:chartData,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}
export default History;