import { Calendar, Computer, Tablet, Wifi } from "lucide-react";
import SearchAccount from "./SearchAccount";
import { useDeivce } from "@/hooks/useDevice";
import { useOnlineVistiors } from "@/hooks/useOnlineVisitors";
import { lazy, Suspense } from "react";
const PlayerData = lazy(() => import("./PlayerData"));
function formatDate(dateInput: Date) {
  const date = new Date(dateInput);
  const shortMonth = date
    .toLocaleString("en-US", { month: "short" })
    .toLowerCase();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${shortMonth} ${day}, ${year}`;
}
const ActionUI = () => {
  const { currentDevice } = useDeivce();
  const { onlineVisitors } = useOnlineVistiors();
  return (
    <section className="sm:w-3/4 sm:mx-auto">
      <div className="flex gap-3 bg-gray-800 p-4 rounded-lg text-white">
        <div className="flex flex-col items-center gap-1 flex-1">
          <span>
            {Boolean(["mobile", "tablet"].includes(currentDevice)) ? (
              <Tablet stroke="#cce9fa" />
            ) : (
              <Computer />
            )}
          </span>
          <span>Device:</span>
          <span>{currentDevice}</span>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1">
          <span>
            <Calendar stroke="yellowgreen" />
          </span>
          <span>Last Update:</span>
          <span className="block">{formatDate(new Date())}</span>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1">
          <span>
            <Wifi stroke={onlineVisitors > 115 ? "green" : "red"} />
          </span>
          <span>Online:</span>
          <span className="block"> {onlineVisitors} </span>
        </div>
      </div>
      <div className="bg-gray-800 p-4  text-white mt-5">
        <span className="size-12 rounded-full flex items-center justify-center border-white border-2 mx-auto">
          1
        </span>
        <h4 className="mt-4 text-center text-xl">Account Connection</h4>
        <p className="text-sm mt-4 text-center text-gray-400">
          please enter your roblux username or ID to connect your account to the
          roblox API
        </p>
      </div>
      <SearchAccount />
    </section>
  );
};

export default ActionUI;
