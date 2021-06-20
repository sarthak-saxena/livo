import clsx from "clsx";
import React, { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Box = ({ children, className, onClick }: Props): JSX.Element => {
  return (
    <div onClick={onClick} className={clsx(className)}>
      {children}
    </div>
  );
};

export default Box;
