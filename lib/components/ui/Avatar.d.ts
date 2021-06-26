import React from "react";
export declare enum AvatarSize {
    Large = "large",
    Small = "small"
}
interface Props {
    children: React.ReactNode;
    className?: string;
    size?: string;
}
declare const Avatar: ({ children, className, size, ...props }: Props) => JSX.Element;
export default Avatar;
