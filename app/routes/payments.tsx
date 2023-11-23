import { EyeOff, Eye } from "lucide-react";
import { SectionHeader } from "~/components/section-header";

export default function Payments() {
  return (
    <SectionHeader
      hero={
        <>
          <div className="text-stone-900 text-2xl font-medium leading-normal mb-8">
            Payments
          </div>
          <div className="text-neutral-600 text-lg">
            Update your payments information or change your plans according to
            your needs.
          </div>
        </>
      }
      side={
        <div className="m-16">
          <div className="text-stone-900 text-lg font-medium">
            Available Balance
            <EyeOff className="inline-block ml-2" size={24} />
          </div>
        </div>
      }
    />
  );
}
