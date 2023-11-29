import { SectionHeader } from "~/components/section-header";
import { useSharedAccount } from "~/shared";

export default function Dashboard() {
  const [account] = useSharedAccount();
  return (
    <>
      <SectionHeader
        hero={
          <>
            <div className="mb-8">
              <span className="text-stone-900 text-2xl leading-normal">
                Welcome Back,
              </span>{" "}
              <span className="text-stone-900 text-2xl font-semibold leading-normal">
                Samuel
              </span>
            </div>
            <div className="w-28 h-16 justify-center items-center gap-2.5 inline-flex mb-4">
              <div className="text-black text-5xl font-semibold">0</div>
              <div className="text-black text-base font-medium">Gigs</div>
            </div>
            <div className="flex gap-3 flex-col mb-8">
              <div className="flex gap-2 items-center text-neutral-600 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Active gigs
                <span className="font-semibold">_</span>
                published
              </div>
              <div className="flex gap-2 items-center text-neutral-600 text-sm">
                <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                Paused
                <span className="font-semibold">_</span>
                gigs
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <button className="w-full md:w-48 h-14 px-8 py-4 bg-primary-700 hover:bg-primary-600 rounded-lg justify-center items-center gap-2.5 inline-flex text-neutral-50 font-medium">
                Find Work
              </button>
              <a
                href="/dashboard/create"
                className="w-full md:w-48 h-14 px-8 py-4 bg-violet-300 hover:bg-violet-400 rounded-lg justify-center items-center gap-2.5 inline-flex text-primary-700 font-medium"
              >
                Create New Gig
              </a>
            </div>
          </>
        }
      />
      <div className="w-full mt-24 px-24 pt-12 pb-28 bg-purple-50 rounded-lg flex-col justify-start items-center gap-16 inline-flex">
        <div className="text-stone-900 text-2xl font-medium">
          Popular Searches
        </div>
        <div className="flex-col justify-start items-center gap-8 flex">
          <div className="justify-start items-start gap-4 inline-flex">
            <button className="px-6 py-4 bg-violet-300 rounded-full justify-center items-center gap-6 flex">
              <div className="text-stone-900">Logo Design</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Graphics Design</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">UI/UX Design</div>
            </button>
          </div>
          <div className="justify-start items-start gap-4 inline-flex">
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Product Design</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Tokenomics</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Forex Trading</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">React Developer</div>
            </button>
          </div>
          <div className="justify-start items-start gap-4 inline-flex">
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Product Design</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Tokenomics</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Forex Trading</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">Photography</div>
            </button>
            <button className="px-6 py-4 bg-violet-100 rounded-full justify-center items-center gap-6 flex">
              <div className="text-neutral-600">React Developer</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
