import React from "react";

type SectionTitleColor = "black" | "white";

interface SectionTitleProps {
  title: string;
  marginBottom: string;
  color: SectionTitleColor;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  marginBottom,
  color,
}) => {
  return (
    <div className={`flex gap-4 items-center mb-${marginBottom}`}>
      <div className="h-5 w-5 bg-optimist-red"></div>
      <h1 className={`text-${color} text-3xl`}>{title}</h1>
    </div>
  );
};

export default SectionTitle;
