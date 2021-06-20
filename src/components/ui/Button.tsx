import React, { MouseEventHandler } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

//
const useStylesFromThemeFunction = createUseStyles((theme: any) => ({
  container: {
    padding: "0 10px 0 10px",
    fontSize: "14px",
  },
}));

const Button = ({
  children,
  className,
  onClick,
  disabled,
  ...props
}: Props): JSX.Element => {
  const classes = useStylesFromThemeFunction(props);
  return (
    <button
      onClick={onClick}
      className={clsx("button", className, classes.container)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
