import { Link } from "@remix-run/react";
import SvgNomad from "~/assets/svg/nomad.svg";

interface SectionHeaderProps {
  hero?: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  hero,
  action,
}) => {
  return (
    <div className="w-full relative bg-gradient-to-l from-violet-300 to-violet-200 rounded-lg  flex flex-row justify-between items-center">
      <div className="w-full md:w-1/2 p-8 md:p-16 md:pt-12">{hero}</div>
      {action ? (
        <div className="p-8 md:p-16 md:pt-12">
          <Link
            to={action.href}
            className="px-8 py-4 bg-primary-700 hover:bg-primary-600 text-neutral-50 font-medium rounded-lg justify-center items-center gap-4 inline-flex"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 14V19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H5.5C4.96957 21 4.46086 20.7893 4.08579 20.4142C3.71071 20.0391 3.5 19.5304 3.5 19V5C3.5 4.46957 3.71071 3.96086 4.08579 3.58579C4.46086 3.21071 4.96957 3 5.5 3H10.5V5H5.5V19H19.5V14H21.5Z"
                fill="currentColor"
              />
              <path
                d="M21.5 7H17.5V3H15.5V7H11.5V9H15.5V13H17.5V9H21.5V7Z"
                fill="currentColor"
              />
            </svg>
            <span>{action.label}</span>
          </Link>
        </div>
      ) : (
        <img
          src={SvgNomad}
          className="hidden md:flex h-full"
          alt="Freelance Nomad"
        />
      )}
    </div>
  );
};
