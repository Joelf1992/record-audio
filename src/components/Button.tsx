import React, { ReactNode } from "react";
import cn from "classnames";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

type Theme = "danger" | "info";

const themes: { [key: string]: string } = {
  danger: "bg-orange-500",
  info: "bg-blue-600",
};

export const Button = ({
  children,
  className,
  theme,
  isLoading,
  disabled,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  theme: Theme;
  isLoading?: boolean;
} & ButtonProps) => {
  return (
    <button
      className={cn(
        "cursor-pointer p-2 rounded-md text-white disabled:opacity-40 disabled:pointer-events-none",
        className,
        themes[theme]
      )}
      {...rest}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
