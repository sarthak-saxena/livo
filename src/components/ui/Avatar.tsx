import React from "react";
import { createUseStyles } from "react-jss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  avatar: {
    textAlign: "center",
    background: "gainsboro",
    padding: "32px",
    borderRadius: "50%",
    fontSize: "2rem",
  },
}));
const Avatar = ({ children, className, ...props }: Props): JSX.Element => {
  const classes = useStylesFromThemeFunction(props);
  return <div className={`${className} ${classes.avatar}`}>{children}</div>;
};

export default Avatar;
