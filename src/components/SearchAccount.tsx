import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { InputContext } from "@/context/InputProvider";
import PlayerData from "./PlayerData";
import { motion } from "framer-motion";
import { usePlayerData } from "@/context/PlayerDataContext";
export default function SearchAccount({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const ctx = useContext(InputContext);
  const playerCtx = usePlayerData();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", ctx?.value],
    enabled: false,
    queryFn: async () => {
      const value = ctx?.value?.trim();
      if (!value) throw new Error("Empty value");

      const isId = /^\d+$/.test(value);
      const url = isId
        ? `https://roblox-server-1111.vercel.app?id=${value}`
        : `https://roblox-server-1111.vercel.app?username=${value}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    },
  });
  useEffect(() => {
    if (!data?.data || playerCtx.playerData) return;

    setCurrentStep(2);

    playerCtx.setPlayerData({
      data: data.data,
      avatarImg: data?.avatarImg?.data?.[0]?.imageUrl || "",
    });
  }, [data, playerCtx.playerData]);
  return (
    <>
      <div className="bg-gray-800 p-4 text-white">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <Loader />
            <h3 className="text-lg">Featching Player Information</h3>
          </motion.div>
        ) : (
          <>
            <div className="flex bg-gray-700 mt-4 rounded-2xl border border-gray-500 px-4 py-2 shadow-sm mx-auto gap-2">
              <User className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                onChange={(e) => ctx?.setValue(e.target.value)}
                placeholder="Please Enter Your Roblox ID"
                className="placeholder:text-sm outline-none w-full placeholder-gray-400"
              />
            </div>
            <Button
              variant="sky"
              disabled={isLoading || !ctx?.value.length}
              onClick={() => {
                refetch();
              }}
              size="lg"
              className=" mt-4"
            >
              {isLoading ? "Fetching Player Information" : "Connect Account"}
            </Button>
          </>
        )}

        <Suspense fallback={<>loading...</>}>
          {Object.keys(data?.data?.[0] || {}).length ? (
            <PlayerData
              img={data?.avatarImg?.data?.[0].imageUrl}
              displayName={data?.data?.[0]?.displayName}
              hasVerifiedBadge={data?.data?.[0].hasVerifiedBadge}
              name={data?.data?.[0].name}
              id={data?.data?.[0].id}
            />
          ) : (
            ""
          )}
        </Suspense>
      </div>
    </>
  );
}
export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin ease-out"></div>
    </div>
  );
};
