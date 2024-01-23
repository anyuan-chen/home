import React from "react";
import { Card } from "./card";
import { twMerge } from "tailwind-merge";

interface BorderCardProps {
  children: React.ReactNode;
  className?: string;
}
const BorderCard = ({ children, className }: BorderCardProps) => {
  return (
    <Card
      className={twMerge(
        "px-4 py-4 border rounded-xl border-gray-500",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default BorderCard;
