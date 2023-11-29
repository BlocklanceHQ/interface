import { SectionHeader } from "~/components/section-header";

export default function Projects() {
  return (
    <>
      <SectionHeader
        hero={
          <div className="text-stone-900 text-2xl font-medium leading-normal">
            Projects
          </div>
        }
        action={{ href: "/projects/new", label: "Create Project" }}
      />
      <h2 className="text-stone-900 text-2xl font-medium my-16">
        Upcoming Deadlines
      </h2>
      <p className="py-8">None yet</p>
    </>
  );
}
