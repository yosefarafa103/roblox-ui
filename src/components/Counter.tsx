import { lazy, Suspense, useState } from "react";
import daimond from "@/assets/imgs/ice 1-CK2a3yVT.webp";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InputProvider } from "@/context/InputProvider";
import { PlayerDataProvider } from "@/context/PlayerDataContext";
import { Loader } from "./SearchAccount";
import { usePackages } from "@/context/PackagesContext";
import { coins } from "./AppPage";
const ActionUI = lazy(() => import("./ActionUI"));
const Counter = () => {
  const [count, setCount] = useState(50);
  const [fade] = useState(false);
  const { currentPackage } = usePackages();
  const handleDecrease = () => {
    if (count > 0) setCount(count - 1);
    return count;
  };
  const queryClient = new QueryClient();
  return (
    <>
      {count == 0 ? (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <PlayerDataProvider>
              <InputProvider>
                <ActionUI />
              </InputProvider>
            </PlayerDataProvider>
          </Suspense>
        </QueryClientProvider>
      ) : (
        <>
          <h3 className="text-red-500 font-bold text-center select-none">
            Complete 50 clicks to continue
          </h3>
          <div
            onClick={handleDecrease}
            className={cn(
              "max-h-svh flex flex-col items-center justify-center select-none mt-40",
            )}
          >
            <h1
              className={cn(
                fade ? "animate-fade" : "",
                "text-4xl animate-fade text-red-600",
                "mb-10 font-bold",
              )}
            >
              {count}
            </h1>

            <div className="flex relative items-center justify-center">
              <img
                src={coins[currentPackage - 1].img}
                className="absolute scale-[0.4] z-100"
                alt=""
              />
              <motion.img whileTap={{ scale: 1.02 }} src={daimond} alt="" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Counter;
