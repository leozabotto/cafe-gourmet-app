import React from "react";
import { Link } from "react-router-dom";

export interface CardSelectModuleProps {
  children: React.ReactNode;
  to: string;
}

export function CardSelectModule({ children, to }: CardSelectModuleProps) {
  return (
    <Link to={to}>
      <div className="w-auto cursor-pointer flex-row items-center justify-center rounded-lg border bg-primary p-6 transition-opacity duration-200 hover:opacity-80">
        <h4 className="text-center text-lg text-white">{children}</h4>
      </div>
    </Link>
  );
}
