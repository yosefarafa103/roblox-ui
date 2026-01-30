import { Crown, Diamond } from "lucide-react";
import robluxImg from "../assets/imgs/roblux.png";
import { cn } from "@/lib/utils";
import { lazy, Suspense, useCallback } from "react";
import { usePackages } from "./PackagesContext";
import Counter from "./Counter";
interface Props {
  coins: number;
  id: number;
  isActive?: boolean;
}
const data: Props[] = [
  { id: 1, coins: 50, isActive: false },
  { id: 2, coins: 100, isActive: false },
  { id: 3, coins: 1000, isActive: false },
  { id: 4, coins: 10_000, isActive: true },
];
const AppPage = () => {
  const { currentPackage } = usePackages();
  return (
    <section className="overflow-hidden max-h-svh relative">
      {currentPackage ? (
        <Suspense fallback={<>loading...</>}>
          <Counter />
        </Suspense>
      ) : (
        <>
          <h3 className="font-bold text-lg mb-3 text-center">
            Choose Your Gift Package
          </h3>
          <section className="grid sm:grid-cols-4 grid-cols-2 gap-2 max-h-svh">
            {data.map((item) => (
              <PackageGame {...item} />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default AppPage;

export function PackageGame({ coins, isActive = false, id }: Props) {
  const { setcurrentPackage } = usePackages();
  const handelFn = useCallback(() => {
    setcurrentPackage(id);
  }, [id]);
  return (
    <div
      onClick={handelFn}
      className={cn("p-1 rounded-lg bg-blue-400 relative cursor-pointer group")}
    >
      {isActive ? (
        <div className="bg-[#ffd700] absolute top-3 left-3 size-12.5 flex items-center justify-center rounded-full">
          <Crown fill="white" />
        </div>
      ) : (
        ""
      )}
      <img
        src={robluxImg}
        className="size-[170px] z-100 transition duration-300 group-hover:grayscale-100 object-cover rounded-full mx-auto my-10"
        alt=""
      />
      <div className="my-2 mx-auto text-white text-2xl flex justify-center gap-2 items-center font-bold">
        {coins || 1000} <Diamond size={40} color="#cce9fa" fill="#cce9fa" />
      </div>
      <div className="my-2 mx-auto text-white text-2xl flex justify-center gap-2 items-center font-bold">
        Roblux
      </div>
    </div>
  );
}
