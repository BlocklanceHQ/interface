export default function CreateProject() {
  return (
    <div className="w-96 h-96 relative bg-neutral-100 rounded-2xl shadow">
      <div className="left-[271px] top-[48px] absolute text-stone-900 text-2xl font-medium font-['Lexend Deca']">
        Tell Us More About Your Project
      </div>
      <div className="left-[56px] top-[180px] absolute flex-col justify-start items-start gap-8 inline-flex">
        <div className="text-neutral-600 text-xl font-medium font-['Lexend Deca']">
          Title
        </div>
        <div className="w-96 p-6 rounded-lg border border-violet-200 justify-start items-center gap-2.5 inline-flex">
          <div className="text-neutral-400 text-lg font-normal font-['Lexend Deca']">
            eg., Flutter / React App Developer Needed for an Investment and Loan
            App{" "}
          </div>
        </div>
      </div>
      <div className="left-[56px] top-[764px] absolute flex-col justify-start items-start gap-8 inline-flex">
        <div className="text-neutral-600 text-xl font-medium font-['Lexend Deca']">
          Price (USD)
        </div>
        <div className="w-96 h-20 p-6 rounded-lg border border-violet-200" />
      </div>
      <div className="left-[56px] top-[356px] absolute flex-col justify-start items-start gap-8 inline-flex">
        <div className="text-neutral-600 text-xl font-medium font-['Lexend Deca']">
          Description
        </div>
        <div className="w-96 h-72 p-6 rounded-lg border border-violet-200 justify-start items-start gap-2.5 inline-flex">
          <div className="text-neutral-400 text-lg font-normal font-['Lexend Deca']">
            Give a brief but notable description about your project
          </div>
        </div>
      </div>
      <div className="w-96 left-[56px] top-[921px] absolute justify-between items-start inline-flex">
        <div className="px-12 py-6 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-indigo-500 text-2xl font-medium font-['Lexend Deca']">
            50
          </div>
        </div>
        <div className="px-12 py-6 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-indigo-500 text-2xl font-medium font-['Lexend Deca']">
            100
          </div>
        </div>
        <div className="px-12 py-6 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-indigo-500 text-2xl font-medium font-['Lexend Deca']">
            500
          </div>
        </div>
        <div className="px-12 py-6 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-indigo-500 text-2xl font-medium font-['Lexend Deca']">
            1000
          </div>
        </div>
        <div className="px-12 py-6 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-indigo-500 text-2xl font-medium font-['Lexend Deca']">
            5000
          </div>
        </div>
      </div>
      <div className="w-96 p-6 left-[56px] top-[1063px] absolute bg-indigo-700 rounded-md justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-50 text-2xl font-medium font-['Lexend Deca']">
          Publish
        </div>
      </div>
      <div className="left-[153px] top-[102px] absolute text-neutral-600 text-2xl font-light font-['Lexend Deca']">
        Get the best crypto experts to engage with ur project.
      </div>
    </div>
  );
}
