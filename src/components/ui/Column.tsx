import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    width: "100%",
  },
}));

const Column = ({ children, className, ...props }: Props): JSX.Element => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <div className={clsx("columns", classes.container, className)}>
      {children}
    </div>
  );
};

export default Column;
