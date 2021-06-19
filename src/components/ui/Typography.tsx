import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Typography = ({ children, className }: Props): JSX.Element => {
  return <span className={className}>{children}</span>;
};

export default Typography;
