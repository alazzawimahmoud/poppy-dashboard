import { HTMLAttributes } from "react";
import { classNames } from "../utils";

const Button: React.FunctionComponent<{ isActive: boolean } & HTMLAttributes<HTMLButtonElement>> = ({ isActive, children, ...rest }) => {
  return (
    <button className={classNames(
      "p-2 text-sm font-bold leading-tight text-white  rounded-md",
      isActive ? 'bg-red-800' : 'bg-cool-gray-500'
    )} {...rest}>
      {children}
    </button>
  );
}
export default Button;