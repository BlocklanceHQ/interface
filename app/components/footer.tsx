import { Form, useFetcher } from "@remix-run/react";
import { LoaderIcon } from "lucide-react";
import OnchainImg from "~/assets/onchain.png";

export const Footer = () => {
  const { state, data } = useFetcher({ key: "subscribe" });
  const pending = state !== "idle";
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

      <Form
        action="/?index"
        method="post"
        className="w-full flex-col justify-center items-center gap-6 inline-flex"
        navigate={false}
        fetcherKey="subscribe"
      >
        {data ? (
          <div className="text-indigo-500 text-xl font-semibold">
            Thank you for subscribing! We will notify you once we launch.
          </div>
        ) : (
          <>
            <input
              type="email"
              name="email"
              className="md:w-1/3 px-8 py-4 bg-neutral-100 rounded shadow placeholder:text-primary-400"
              placeholder="Email Address"
            />
            <button
              type="submit"
              className={`px-9 py-4 bg-violet-200 rounded-md text-primary-700 font-semibold flex items-center gap-4 ${
                pending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-500 hover:text-primary-50"
              }`}
            >
              {pending && <LoaderIcon className="animate-spin mr-2" />}
              {pending ? "Subscribing..." : "Subscribe"}
            </button>
          </>
        )}
      </Form>
    </footer>
  );
};
