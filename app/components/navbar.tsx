import { NavLink, Link } from "@remix-run/react";
import { useIsAuthenticated } from "~/shared";
import { ConnectWallet } from "./connect";
import { LanguageSelector } from "./language";

const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Payments",
    path: "/payments",
  },
];

export const Navbar = () => {
  const [isAuthenticated] = useIsAuthenticated();
  return (
    <nav className="mb-32">
      <header className="fixed top-0 w-full p-4 md:px-16 bg-neutral-50 rounded-bl-lg rounded-br-lg shadow justify-between items-center inline-flex z-10">
        <Link to="/" className="justify-center items-center gap-4 flex">
          <span className="px-4 py-3 bg-primary-700 rounded-lg justify-center items-center gap-2.5 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="24"
              viewBox="0 0 11 24"
              fill="none"
              className="text-neutral-50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.76231 0C2.40614 0.180461 2.78809 0.842255 2.62256 1.49015C2.6212 1.49456 2.62018 1.49932 2.61882 1.50407C2.61747 1.50881 2.61645 1.51323 2.6151 1.51798C2.54827 1.76764 2.48009 2.02136 2.41123 2.27882C2.40953 2.28493 2.40817 2.2907 2.40647 2.29681C2.40478 2.30292 2.40343 2.30868 2.40173 2.31478C1.96754 3.9352 1.49603 5.6947 1.02588 7.44945L4.98925 8.51118C5.4594 6.75677 5.9309 4.99728 6.36509 3.37686C6.36679 3.37075 6.36815 3.36499 6.36984 3.35889C6.37154 3.35278 6.37289 3.34701 6.37459 3.3409C6.65444 2.25813 6.01469 1.14993 4.93701 0.85108L4.91903 0.846327L4.90105 0.841589L2.93735 0.315461L1.76231 0.000679089V0Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.813646 8.24156C0.563646 9.17541 0.315341 10.1015 0.0751781 10.998C0.0734821 11.0041 0.0721288 11.0099 0.0704328 11.016C0.0687367 11.0221 0.0673752 11.0278 0.0656792 11.034C-0.214172 12.1167 0.425589 13.2249 1.50327 13.5238L1.52125 13.5285L1.53922 13.5333L3.50293 14.0594C3.67219 13.4281 3.84859 12.7704 4.02905 12.0957C4.03074 12.0896 4.0321 12.0838 4.03379 12.0777C4.03549 12.0716 4.03685 12.0658 4.03855 12.0597C4.27871 11.1632 4.52701 10.2371 4.77735 9.30329L0.813985 8.24121L0.813646 8.24156Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.56958 9.51561C5.12759 11.1652 4.69205 12.7907 4.29517 14.2714L9.84367 15.7581C10.0784 14.8816 10.3267 13.9545 10.5821 13.0017C10.5838 12.9959 10.5852 12.9898 10.5869 12.9837C10.5886 12.9776 10.5899 12.9718 10.5916 12.9657C10.8715 11.883 10.2317 10.7748 9.15405 10.4759L9.13607 10.4712L9.11809 10.4664L5.5689 9.51526L5.56958 9.51561Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.89515 24C8.25132 23.8199 7.86937 23.1577 8.03491 22.5102C8.03627 22.5054 8.03728 22.501 8.03864 22.4963C8.03999 22.4915 8.04101 22.4871 8.04237 22.4824C8.1092 22.2327 8.17738 21.979 8.24624 21.7215C8.24793 21.7154 8.24929 21.7096 8.25098 21.7035C8.25268 21.6974 8.25403 21.6917 8.25573 21.6856C8.68992 20.0652 9.16143 18.3056 9.63158 16.5512L5.66856 15.4895C5.19841 17.2439 4.7269 19.0034 4.29271 20.6238C4.29101 20.6296 4.28965 20.6357 4.28795 20.6418C4.28626 20.6479 4.28491 20.6537 4.28321 20.6598C4.00336 21.7426 4.64311 22.8508 5.72079 23.1496L5.73877 23.1544L5.75675 23.1591L7.72046 23.6852L8.89549 24H8.89515Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-neutral-600 font-bold">Blocklance</span>
        </Link>
        {isAuthenticated && (
          <div className="hidden md:flex p-2 bg-neutral-100 rounded-full items-start text-sm text-neutral-500">
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.path}
                to={navLink.path}
                className={({ isActive }) =>
                  `px-12 py-2.5 ${
                    isActive
                      ? "bg-primary-700 text-neutral-100"
                      : "bg-neutral-100 hover:text-primary-700"
                  }  rounded-3xl justify-center items-center flex`
                }
              >
                {navLink.name}
              </NavLink>
            ))}
          </div>
        )}
        <div className="hidden md:flex justify-center items-center gap-6">
          <LanguageSelector />
          {isAuthenticated && (
            <div className="p-1 rounded-3xl items-start flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0748 14.4083L14.9998 13.3333V9.16659C14.9998 6.60825 13.6331 4.46659 11.2498 3.89992V3.33325C11.2498 2.64159 10.6915 2.08325 9.9998 2.08325C9.30813 2.08325 8.7498 2.64159 8.7498 3.33325V3.89992C6.35813 4.46659 4.9998 6.59992 4.9998 9.16659V13.3333L3.9248 14.4083C3.3998 14.9333 3.76647 15.8333 4.50813 15.8333H15.4831C16.2331 15.8333 16.5998 14.9333 16.0748 14.4083ZM13.3331 14.1666H6.66647V9.16659C6.66647 7.09992 7.9248 5.41659 9.9998 5.41659C12.0748 5.41659 13.3331 7.09992 13.3331 9.16659V14.1666ZM9.9998 18.3333C10.9165 18.3333 11.6665 17.5833 11.6665 16.6666H8.33313C8.33313 17.5833 9.0748 18.3333 9.9998 18.3333Z"
                  fill="#4B4B4B"
                />
                <circle cx="13" cy="6" r="2" fill="#F64C4C" />
              </svg>
            </div>
          )}
          {!isAuthenticated && <ConnectWallet />}
          <div className="justify-start items-start gap-2.5 flex">
            <div className="w-10 h-10 relative">
              <div className="w-10 h-10 left-0 top-0 absolute">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.7521 29.2211C39.1883 26.4619 40 23.3257 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C23.3257 40 26.4619 39.1883 29.2211 37.7521C29.0768 37.1921 29 36.605 29 36C29 32.134 32.134 29 36 29C36.605 29 37.1921 29.0768 37.7521 29.2211ZM36.0015 32C36.001 32 36.0005 32 36 32C33.7909 32 32 33.7909 32 36C32 36.0005 32 36.001 32 36.0015C33.5151 34.8634 34.8634 33.5151 36.0015 32Z"
                    fill="#EDEEF2"
                  />
                  <mask
                    id="mask0_726_23240"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                  >
                    <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
                  </mask>
                  <g mask="url(#mask0_726_23240)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33.9352 39.4266C35.2503 38.1195 36.001 36.6091 36.001 35C36.001 33.9821 35.7006 33.0036 35.1469 32.0912C33.3476 32.4821 32 34.0837 32 36C32 37.4536 32.7754 38.7262 33.9352 39.4266ZM31.4272 41.3001C29.9407 40.0164 29 38.1181 29 36C29 33.232 30.6066 30.8393 32.9382 29.7034C30.0287 27.4587 25.3177 26 20.001 26C11.1644 26 4.00098 30.0294 4.00098 35C4.00098 39.9706 11.1644 44 20.001 44C24.4767 44 28.5233 42.9663 31.4272 41.3001Z"
                      fill="#838799"
                    />
                    <circle cx="20.001" cy="17" r="6" fill="#838799" />
                  </g>
                </svg>

                <div className="w-3 h-3 left-[14px] top-[11px] absolute bg-slate-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};
