import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

export enum AvatarSize {
  Large = "large",
  Small = "small",
}

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: string;
}

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  avatar: {
    textAlign: "center",
    background: "gainsboro",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    fontSize: "2rem",
    height: "100px",
    width: "100px",
  },
  small: {
    fontSize: "1rem",
    height: "50px",
    width: "50px",
  },
}));
const Avatar = ({
  children,
  className,
  size,
  ...props
}: Props): JSX.Element => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <div
      className={clsx(
        className,
        classes.avatar,
        size && size === AvatarSize.Small ? classes.small : classes.large
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
