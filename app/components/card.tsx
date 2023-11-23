import { FC } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Card: FC<CardProps> = ({ title, icon, description }) => {
  return (
    <div className="px-4 py-12 bg-purple-50 rounded-lg shadow flex-col justify-start items-start gap-8 inline-flex animate-in fade-in zoom-in delay-700 duration-1000 hover:bg-gradient-to-b from-[rgba(0,_0,_0,_0.00)] to-[rgba(53,_26,_229,_0.08)] cursor-default">
      <span className="border rounded-full p-3 bg-purple-50/30 shadow backdrop-blur-sm">
        {icon}
      </span>

      <div className="flex-col justify-start items-start gap-6 flex">
        <div className="w-full text-stone-900 text-lg font-medium">{title}</div>
        <div className="w-full h-14 text-neutral-600 text-base break-words">
          {description}
        </div>
      </div>
    </div>
  );
};
