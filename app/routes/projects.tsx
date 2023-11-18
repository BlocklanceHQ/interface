import { SectionHeader } from "~/components/section-header";

export default function Projects() {
  return (
    <SectionHeader
      hero={
        <>
          <div className="w-full text-stone-900 text-5xl font-semibold leading-[62px] mb-6">
            Welcome to the Future of Work!
          </div>
        </>
      }
    />
  );
}
