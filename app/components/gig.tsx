export const GigCard = () => {
  return (
    <div className="w-80 h-80 bg-neutral-100 flex-col justify-center items-start inline-flex">
      <div className="w-80 h-52 relative">
        <img
          className="w-80 h-52 left-0 top-0 absolute rounded-tl-lg rounded-tr-lg"
          src="https://via.placeholder.com/310x208"
        />
        <div className="w-80 h-52 left-0 top-0 absolute opacity-10 bg-black rounded-tl-lg rounded-tr-lg" />
      </div>
      <div className="self-stretch p-4 bg-neutral-50 rounded-bl-lg rounded-br-lg flex-col justify-start items-start gap-2 inline-flex">
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="w-10 h-10 justify-center items-center flex">
            <div className="w-10 h-10 relative">
              <img
                className="w-10 h-10 left-0 top-0 absolute"
                src="https://via.placeholder.com/40x40"
              />
            </div>
          </div>
          <div className="w-56 text-stone-900 text-xs font-medium leading-none">
            I will trade trade your crypto and offer consultation on
            investments.
          </div>
        </div>
        <div className="w-72 justify-between items-end inline-flex">
          <div className="w-14 text-indigo-700 text-lg font-medium">
            $1000
          </div>
          <div className="p-1 bg-sky-50 rounded-full justify-start items-end gap-2 flex">
            <div className="w-4 h-4 relative" />
            <div>
              <span className="text-neutral-400 text-xs font-medium">
                4.9{" "}
              </span>
              <span className="text-neutral-600 text-xs font-medium">
                (+1K)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
