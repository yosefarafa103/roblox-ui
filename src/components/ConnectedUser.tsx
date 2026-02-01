import { usePackages } from "@/context/PackagesContext";
import Captcha from "./Capatcha";
import type { Player } from "./PlayerData";
import { coins } from "./AppPage";

const ConnectedUser = ({ name, id, displayName, img }: Partial<Player>) => {
  const { currentPackage } = usePackages();

  return (
    <>
      <div className="my-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700 space-y-3 text-left backdrop-blur-sm sm:max-w-md mx-auto">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Connected User
          </label>
          <div className="flex items-center gap-4 mt-2">
            <img
              src={img}
              alt="user-img"
              className="w-20 h-20 rounded-lg border-2 border-slate-600"
              style={{ backgroundColor: "rgb(30 41 59 / 0.9)" }}
            />
            <div className="grow space-y-1">
              <p className="text-white text-lg font-semibold leading-tight">
                {displayName}
              </p>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  ></path>
                </svg>
                <span>
                  ID:
                  <strong className="text-sky-400 font-semibold">{id}</strong>
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>
                  User:
                  <strong className="text-sky-400 font-semibold">{name}</strong>
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3v11.25"
                  ></path>
                </svg>
                <span>
                  READY:
                  <strong className="text-sky-400 font-semibold">
                    {coins[currentPackage - 1].coins} Robux
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Captcha />
    </>
  );
};

export default ConnectedUser;
