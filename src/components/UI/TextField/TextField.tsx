import classNames from "classnames";
import type { JSX } from "react";
interface TextFieldProps {
  children?: React.ReactNode;
  color?: string;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
}

const TextField: React.FC<TextFieldProps> = ({
  children,
  color,
  className,
  element: Component = "p",
}) => {
  return (
    <Component className={classNames(className, color)}>{children}</Component>
  );
};

export default TextField;
