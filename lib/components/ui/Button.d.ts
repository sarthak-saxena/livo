import React, { MouseEventHandler } from "react";
interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}
declare const Button: ({ children, className, onClick, disabled, ...props }: Props) => JSX.Element;
export default Button;
