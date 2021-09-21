import { HTMLAttributes } from "react"
import { classNames } from "../utils"

const MetricItem: React.FunctionComponent<{
    value: string | number, secondaryValue?: string, label: string
} & HTMLAttributes<HTMLDivElement>> = ({
    value, label, secondaryValue, className, ...props
}) => {
        return <div className={classNames(
            'grid p-1 transition bg-gray-200 border rounded-md place-content-center',
            className
        )} {...props}>
            <div className="text-lg font-bold">
                <span>{value}</span>
                {secondaryValue && <span className="ml-1 text-xs font-thin">({secondaryValue})</span>}
            </div>
            <div className="font-medium text-tiny text-cool-gray-400">{label}</div>
        </div>
    }
export default MetricItem;