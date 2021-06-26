import React, { MouseEventHandler } from "react";
interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}
declare const Box: ({ children, className, onClick }: Props) => JSX.Element;
export default Box;
