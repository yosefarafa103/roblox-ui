import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InputContext } from "@/context/InputProvider";
import PlayerData from "./PlayerData";
export default function SearchAccount() {
  const ctx = useContext(InputContext);
  const [active, setActive] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const data = await fetch(
        `https://roblox-server-1111.vercel.app?username=${ctx?.value}`
      ).then((res) => res.json());
      return data;
    },
    queryKey: ["user", ctx?.value],
    enabled: false,
    retryDelay: 1,
    retry: 2,
  });
  console.log("data: ", data);

  useEffect(() => setActive(!isLoading), [isLoading]);
  return (
    <>
      <div className="bg-gray-800 p-4 text-white">
        <div className="flex items-center bg-gray-700 mt-4 rounded-lg border border-gray-500 px-4 py-2 shadow-sm mx-auto gap-2">
          <User className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            onChange={(e) => ctx?.setValue(e.target.value)}
            placeholder="Please Enter Your Roblox ID"
            className="placeholder:text-sm outline-none w-full placeholder-gray-400"
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={() => {
            refetch();
            setActive(true);
          }}
          size="lg"
          className="w-full flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold text-lg rounded-xl hover:from-sky-500 hover:to-sky-500 active:scale-[0.98] transition-all duration-200 py-7 mt-4"
        >
          {isLoading ? "Fetching Player Information" : "Connect Account"}
        </Button>
      </div>
      {isLoading ? "loading" : ""}
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
    </>
  );
}
