import { lazy, Suspense, useEffect, useState } from "react";
import hand from "@/assets/imgs/handpng.png";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InputProvider } from "@/context/InputProvider";
const ActionUI = lazy(() => import("./ActionUI"));
const Counter = () => {
  const [count, setCount] = useState(50);
  const [fade, setFade] = useState(false);

  const handleDecrease = () => {
    setFade(true);
    if (count > 0) setCount(count - 1);
    return count;
  };

  useEffect(() => {
    const timer = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timer);
  }, [fade]);
  const queryClient = new QueryClient();
  return (
    <>
      {count == 0 ? (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<>loading...</>}>
            <InputProvider>
              <ActionUI />
            </InputProvider>
          </Suspense>
        </QueryClientProvider>
      ) : (
        <>
          <h3 className="text-red-500 text-center select-none">
            Complete 50 clicks to continue
          </h3>
          <div
            onClick={handleDecrease}
            className={cn(
              fade ? "pointer-events-none " : "pointer-events-auto",
              "h-svw flex  items-center justify-center select-none "
            )}
          >
            <img
              src={hand}
              className="absolute animate-ping duration-500 top-[40%] right-[25%]"
              alt=""
            />
            <AnimatePresence>
              {fade ? (
                <motion.div className="animate-ping relative -top-10 text-xl text-red-600">
                  -1
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
            <h1
              className={cn(
                fade ? "animate-fade" : "",
                "text-4xl animate-fade text-red-600"
              )}
            >
              {count}
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default Counter;
