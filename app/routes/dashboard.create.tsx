export default function CreateGig() {
  return (
    <div className="w-full bg-neutral-100 rounded-2xl shadow px-14 pt-12 pb-14">
      <h2 className="text-stone-900 text-2xl font-medium m-12 text-center">
        Gig Overview
      </h2>
      <div className="flex-col justify-start items-start gap-8 inline-flex">
        <div className="flex-col justify-start items-start gap-4 flex">
          <div>
            <span className="text-neutral-600 text-xl font-medium bg-transparent">
              Gig Title
            </span>
            <span className="text-red-500 text-xl font-medium"> *</span>
          </div>
          <div className="w-full">
            <span className="text-neutral-600 text-lg font-light leading-normal">
              Your Gig title serves as your storefront, making it crucial to{" "}
            </span>
            <span className="text-neutral-600 text-lg font-medium leading-normal">
              add keywords
            </span>
            <span className="text-neutral-600 text-lg font-light leading-normal">
              {" "}
              that potential clients are likely to use when searching for a
              service like yours.
            </span>
          </div>
        </div>
        <div className="w-full justify-start items-end gap-4  flex-col flex">
          <textarea className="w-full h-32 p-6 rounded-lg border border-violet-200 justify-start items-start gap-2.5 inline-flex text-neutral-600 text-lg">
            I will do something am skilled at
          </textarea>

          <div className="text-neutral-400 text-lg">0/80 Max</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="px-12 py-6 bg-indigo-700 rounded-md justify-center items-center gap-2.5 inline-flex text-neutral-50 text-xl font-medium">
          Save & Continue
        </button>
      </div>
      {/* <div className="flex-col justify-start items-start gap-8 inline-flex">
        <div>
          <span className="text-neutral-600 text-xl font-medium">
            Related Tags{" "}
          </span>
          <span className="text-red-500 text-xl font-medium">*</span>
        </div>
        <div className="flex-col justify-start items-end gap-4 flex">
          <div className="w-full px-6 py-4 rounded-lg border border-violet-200 justify-start items-center gap-2.5 inline-flex">
            <button className="px-3 py-2 bg-violet-100 rounded justify-center items-center gap-2 flex">
              <div className="text-indigo-600 text-xs">Flutter</div>
              <div className="w-4 h-4 relative" />
            </button>
          </div>
          <div className="text-neutral-400 text-lg">1/5 Tags Max</div>
        </div>
      </div> */}
    </div>
  );
}
