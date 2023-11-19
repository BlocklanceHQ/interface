import { SectionHeader } from "~/components/section-header";

export default function Projects() {
  return (
    <SectionHeader
      hero={
        <div className="text-stone-900 text-2xl font-medium leading-normal">
          Projects
        </div>
      }
      action={{ href: "/projects/new", label: "Create Project" }}
    />
  );
}
