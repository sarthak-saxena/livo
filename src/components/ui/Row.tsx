import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

//
const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    width: "100%",
    margin: "2rem 1rem 2rem 1rem !important",
  },
}));

const Row = ({ children, className, ...props }: Props): JSX.Element => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <div className={clsx("columns", className, classes.container)}>
      {children}
    </div>
  );
};

export default Row;
