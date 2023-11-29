import { ChevronRight } from "lucide-react";

const crumbs = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Project",
    path: "/project",
  },
  {
    name: "Create Project",
    path: "/project/new",
  },
  {
    name: "Create Gig",
    path: "/dashboard/create",
  },
  {
    name: "Payments",
    path: "/payments",
  },
];

export const Breadcrumbs: React.FC<{ paths: string[] }> = ({ paths }) => {
  if (paths.length < 3) return null;
  return (
    <div className="w-full px-16 pt-16 pb-8 bg-neutral-100 -mt-10">
      <div className="items-center gap-1.5 flex">
        {paths.map((path, index) => {
          if (path === "") {
            return null;
          }
          const crumb = crumbs.find(
            (crumb) =>
              `${crumb.path}` === `${paths.slice(0, index + 1).join("/")}`
          );
          if (!crumb) {
            return null;
          }
          return (
            <div
              key={crumb.path}
              className="py-2.5 rounded-md justify-start items-center gap-2.5 flex"
            >
              {index !== 1 ? (
                <ChevronRight className="w-5 h-5 text-neutral-400" />
              ) : (
                <div className="w-5 h-5 relative"></div>
              )}
              <a
                href={crumb.path}
                className={
                  index === paths.length - 1
                    ? "text-neutral-600 hover:text-neutral-700"
                    : "text-neutral-400 hover:text-neutral-500"
                }
                title={crumb.name}
              >
                {crumb.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
