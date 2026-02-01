import { Calendar, Computer, Tablet, Wifi } from "lucide-react";
import SearchAccount from "./SearchAccount";
import { useDeivce } from "@/hooks/useDevice";
import { useOnlineVistiors } from "@/hooks/useOnlineVisitors";
import { memo, useEffect, useRef, useState } from "react";
import { usePlayerData } from "@/context/PlayerDataContext";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import InformationDialog from "./InformationDialog";
import ConnectedUser from "./ConnectedUser";
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
  const [currentStep, setCurrentStep] = useState(1);
  const { playerData } = usePlayerData();
  const dialogRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (playerData) dialogRef?.current?.click();
  }, [playerData]);
  const tabs = [
    {
      icon: ["mobile", "tablet"].includes(currentDevice) ? (
        <Tablet stroke="#cce9fa" />
      ) : (
        <Computer />
      ),
      label: "Device:",
      value: currentDevice,
    },
    {
      icon: <Calendar stroke="yellowgreen" />,
      label: "Last Update:",
      value: formatDate(new Date()),
    },
    {
      icon: <Wifi stroke={onlineVisitors > 115 ? "green" : "red"} />,
      label: "Online:",
      value: onlineVisitors,
    },
  ];
  const player = Array.isArray(playerData?.data)
    ? playerData.data[0]
    : playerData?.data;
  return (
    <section className="sm:w-3/4 md:w-1/2 sm:mx-auto">
      <div className="flex gap-3 bg-gray-800 p-4 rounded-lg text-white">
        {tabs.map(({ icon, label, value }, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className="max-sm:text-xs">{icon}</span>
            <span className="max-sm:text-xs">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      {currentStep === 1 ? (
        <>
          <div className="bg-gray-800 p-4  text-white mt-5 rounded-2xl rounded-br-none rounded-bl-none">
            <Step step={1} />
            <h4 className="mt-4 text-center text-xl">Account Connection</h4>
            <p className="text-sm mt-4 text-center text-gray-400">
              please enter your roblux username or ID to connect your account to
              the roblox API
            </p>
          </div>
          <SearchAccount setCurrentStep={setCurrentStep} />
        </>
      ) : currentStep === 2 ? (
        <Dialog>
          <div className="bg-gray-800 p-4  text-white mt-5 rounded-2xl">
            <Step step={2} />
            <h4 className="mt-4 text-center text-xl">Account Connection</h4>
            <p className="text-sm mt-4 text-center text-gray-400">
              please enter your roblux username or ID to connect your account to
              the roblox API
            </p>
            <DialogTrigger ref={dialogRef} />
            <DialogContent>
              {
                <InformationDialog
                  setCurrentStep={setCurrentStep}
                  img={playerData?.avatarImg}
                  displayName={player?.displayName}
                  hasVerifiedBadge={player?.hasVerifiedBadge}
                  name={player?.name}
                  id={player?.id}
                  joined={
                    player?.created
                      ? formatDate(new Date(player.created))
                      : undefined
                  }
                />
              }
            </DialogContent>
          </div>
        </Dialog>
      ) : (
        <div className="bg-gray-800 p-4  text-white mt-5 rounded-2xl rounded-br-none rounded-bl-none">
          <Step step={3} />
          <h4 className="mt-4 text-center text-xl text-green-400">
            API Connected!
          </h4>
          <p className="text-sm mt-4 text-center text-gray-400">
            Click the checkbox to complete the one time verification. your
            selected amount of robux will be imported upon completed
          </p>
          <ConnectedUser
            img={playerData?.avatarImg}
            name={`${
              Array.isArray(playerData?.data)
                ? playerData?.data?.[0]?.name
                : playerData?.data?.name
            }`}
            id={
              Array.isArray(playerData?.data)
                ? playerData?.data?.[0]?.id
                : playerData?.data?.id
            }
          />
        </div>
      )}
    </section>
  );
};

export default memo(ActionUI);
export function Step({ step }: { step: number }) {
  return (
    <span className="size-12 rounded-full flex items-center justify-center border-sky-500 text-sky-500 border-2 mx-auto">
      {step}
    </span>
  );
}
