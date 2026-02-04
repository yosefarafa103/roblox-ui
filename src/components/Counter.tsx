import { lazy, Suspense, useEffect, useRef, useState } from "react";
import daimond from "@/assets/imgs/ice 1-CK2a3yVT.webp";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InputProvider } from "@/context/InputProvider";
import { PlayerDataProvider } from "@/context/PlayerDataContext";
import { Loader } from "./SearchAccount";
import { usePackages } from "@/context/PackagesContext";
import { coins } from "./AppPage";
import audio from "@/assets/audio/glass-breaking-99389.mp3";
const ActionUI = lazy(() => import("./ActionUI"));
const Counter = () => {
  const [count, setCount] = useState(50);
  const [fade] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  const { currentPackage } = usePackages();
  const [isDelaying, setIsDelaying] = useState(false);
  const handleDecrease = () => {
    if (isDelaying) return;
    setIsDelaying(true);
    setTimeout(() => {
      setCount((prev) => prev - 1);
      setIsDelaying(false);
    }, 0);
  };
  useEffect(() => {
    ref.current?.play();
  }, [count]);
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
          <audio ref={ref} src={audio} />
          <h3 className="text-red-500 font-bold text-center select-none">
            Complete 50 clicks to continue
          </h3>
          <div
            onClick={handleDecrease}
            className={cn(
              "max-h-svh flex flex-col items-center justify-center select-none mt-40",
              isDelaying ? "pointer-events-none" : "pointer-events-auto",
            )}
          >
            <h1
              className={cn(
                fade ? "animate-fade" : "",
                "text-[50px] animate-fade text-red-600",
                "mb-4 font-bold",
              )}
            >
              {count}
            </h1>
            <span className="text-gray-600 mb-4 uppercase font-bold text-xs">
              Tap the ice to release your card!
            </span>
            <motion.div
              whileTap={{ scale: 1.1 }}
              className="flex relative items-center justify-center"
            >
              <img
                src={coins[currentPackage - 1].img}
                className="absolute scale-[0.4] z-100 opacity-50"
                alt=""
              />
              <img src={daimond} alt="" />
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default Counter;
