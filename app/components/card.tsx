import { FC } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Card: FC<CardProps> = ({ title, icon, description }) => {
  return (
    <div className="px-4 py-12 bg-purple-50 rounded-lg shadow flex-col justify-start items-start gap-8 inline-flex animate-in fade-in zoom-in delay-700 duration-1000">
      <div className="w-24 h-24 relative">{icon}</div>
      <div className="flex-col justify-start items-start gap-6 flex">
        <div className="w-full text-stone-900 text-lg font-medium">{title}</div>
        <div className="w-full h-14 text-neutral-600 text-base break-words">
          {description}
        </div>
      </div>
    </div>
  );
};
