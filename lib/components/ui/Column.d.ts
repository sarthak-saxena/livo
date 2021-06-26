import React from "react";
interface Props {
    children: React.ReactNode;
    className?: string;
}
declare const Column: ({ children, className, ...props }: Props) => JSX.Element;
export default Column;
