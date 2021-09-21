import { HTMLAttributes } from "react"
import { ZoneExtended } from "../schema"
import { classNames } from "../utils"
import MetricItem from "./metric-item"

const ZoneItem: React.FunctionComponent<{
    zone: ZoneExtended
} & HTMLAttributes<HTMLDivElement>> = ({
    zone, ...props
}) => {
        return <div className={classNames(
            'grid gap-1 border border-cool-gray-300 rounded-md p-2 hover:border-red-800 transition cursor-pointer'
        )} {...props}>
            <div className="text-xl font-semibold text-red-800 transition-all ">{zone.name}</div>
            <div className="grid h-16 grid-cols-3 gap-2 text-center">
                <MetricItem className="col-span-2" value={`🚗 ${zone.cars}`}
                    secondaryValue={`${Math.round(zone.carsPercentage * 100)}%`}
                    label="Cars" />
                <MetricItem value={`🅿️ ${zone.slots}`} label="Parkings" />
            </div>
        </div>
    }

export default ZoneItem;