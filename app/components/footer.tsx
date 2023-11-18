import OnchainImg from "~/assets/onchain.png";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-primary-700 rounded-lg pb-12">
      <img src={OnchainImg} className="mb-16" />
      <div className="flex flex-col items-center gap-12 mb-16">
        <div className="text-center text-neutral-50 text-2xl font-bold">
          Get notified when we launch
        </div>
        <div className="text-center text-neutral-50">
          Become an early tester – your journey with Blocklance starts NOW!
        </div>
      </div>
      <div className="w-full flex-col justify-center items-center gap-6 inline-flex">
        <input
          className="md:w-1/3 px-8 py-4 bg-neutral-100 rounded shadow placeholder:text-primary-400"
          placeholder="Email Address"
        />
        <button className="px-9 py-4 bg-violet-200 rounded-md text-primary-700 font-semibold">
          Subscribe
        </button>
      </div>
    </footer>
  );
};
