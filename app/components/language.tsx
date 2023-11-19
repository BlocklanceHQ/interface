import { Listbox } from "@headlessui/react";
import { ChevronRightIcon } from "lucide-react";
import { useAppStore } from "~/shared";

const languages = [
  {
    name: "English",
    code: "en",
  },
];

export const LanguageSelector = () => {
  const { language = "en" } = useAppStore();
  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="justify-start items-center gap-2 flex">
      <div className="text-neutral-400 text-xs">Language:</div>
      <Listbox value={language}>
        <Listbox.Button className="px-3.5 py-2 rounded-md border border-neutral-200 items-center gap-4 flex text-neutral-600 text-xs">
          {currentLanguage?.name} <ChevronRightIcon size={15} />
        </Listbox.Button>
        {/* <Listbox.Options>
                {languages.map((lang) => (
                  <Listbox.Option key={lang.code} value={lang.code}>
                    {lang.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options> */}
      </Listbox>
    </div>
  );
};
