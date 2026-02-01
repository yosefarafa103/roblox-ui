import { useEffect, useState } from "react";
import capatcha from "@/assets/imgs/capatcha.png";
export default function Captcha({}) {
  const [status, setStatus] = useState("idle");
  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("verified");
    }, 1500);
  };
  useEffect(() => {
    if (status === "verified") location.href = "http://google.com";
  }, [status]);
  return (
    <div className="sm:max-w-[320px] max-h-[70px] overflow-hidden max-sm:w-full border rounded bg-white shadow p-4 select-none flex justify-between mx-auto">
      <div
        onClick={handleClick}
        className="flex items-center gap-3 cursor-pointer "
      >
        <div className="w-6 h-6 border border-black rounded flex items-center justify-center">
          {status === "loading" && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}

          {status === "verified" && (
            <span className="text-green-600 font-bold scale-200"></span>
          )}
        </div>
        <span className="text-sm font-sans font-semibold text-black">
          I'm not a robot
        </span>
      </div>
      <div className="mt-3 text-right text-[10px] text-gray-400 font-sans font-semibold">
        {/* Protected by Captcha */}
        <img
          src={capatcha}
          className="size-14 object-cover relative -top-4"
          alt=""
        />
      </div>
    </div>
  );
}
