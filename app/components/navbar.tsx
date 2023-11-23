import { NavLink, Link } from "@remix-run/react";
import { useIsAuthenticated } from "~/shared";
import LogoSvg from "~/assets/svg/logo.svg";
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
  const isAuthenticated = useIsAuthenticated();
  return (
    <nav className="mb-32">
      <header className="fixed top-0 w-full p-4 md:px-16 bg-neutral-50/30 rounded-bl-lg rounded-br-lg shadow justify-between items-center inline-flex z-10 backdrop-blur ">
        <Link
          to="/"
          className="justify-center items-center gap-4 flex"
          reloadDocument
        >
          <span className="px-4 py-3 bg-primary-700 rounded-lg justify-center items-center gap-2.5 flex">
            <img src={LogoSvg} alt="Blocklance" />
          </span>
          <span className="text-neutral-600 font-bold">Blocklance</span>
        </Link>
        {isAuthenticated && (
          <div className="hidden md:flex p-2 bg-neutral-100/20 backdrop-blur-sm rounded-full items-start text-sm text-neutral-500">
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.path}
                to={navLink.path}
                className={({ isActive }) =>
                  `px-12 py-2.5 ${
                    isActive
                      ? "bg-primary-700 text-neutral-100"
                      : "bg-transparent hover:text-primary-700"
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
          <ConnectWallet />
        </div>
      </header>
    </nav>
  );
};
