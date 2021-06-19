import React, { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Box = ({ children, className, onClick }: Props): JSX.Element => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default Box;
