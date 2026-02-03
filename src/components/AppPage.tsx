import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense, useCallback } from "react";
import { usePackages } from "../context/PackagesContext";
import Counter from "./Counter";
import { Loader } from "./SearchAccount";
interface Props {
  coins: string;
  id: number;
  isActive?: boolean;
  img: string;
}
export const coins: Props[] = [
  {
    id: 1,
    coins: "400",
    isActive: false,
    img: "https://ffxmodz.com/20260127_143450.png",
  },
  {
    id: 2,
    coins: "800",
    isActive: false,
    img: "https://ffxmodz.com/20260127_143043.png",
  },
  {
    id: 3,
    coins: "2,000",
    isActive: false,
    img: "https://ffxmodz.com/file_000000002e5c722f8b350ce259c47906.png",
  },
  {
    id: 4,
    coins: "10,000",
    isActive: true,
    img: "https://ffxmodz.com/file_00000000e3dc722f8f16f5c50ee5b5e4.png",
  },
];
const AppPage = () => {
  const { currentPackage } = usePackages();
  return (
    <section className="relative">
      {currentPackage ? (
        <Suspense fallback={<Loader />}>
          <Counter />
        </Suspense>
      ) : (
        <>
          <h1 className="text-2xl text-red-600 mb-6 uppercase text-center font-black">
            Site explanation
          </h1>
          <div className="w-full max-w-[500px] aspect-video bg-black border-[6px] border-black rounded-[20px] shadow-[0_10px_0_rgba(0,0,0,0.1)] mx-auto mb-7 overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/gbsvJLnscFg"
              frameBorder="0"
            ></iframe>
          </div>
          <h3 className="text-blue-500 mb-8 font-bold uppercase italic tracking-wide text-center">
            Choose the Roblox package
          </h3>
          <section className="grid max-sm:grid-cols-2 md:grid-cols-4 gap-6 lg:w-1/2 mx-auto">
            {coins.map((item) => (
              <PackageGame {...item} />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default AppPage;

export function PackageGame({ coins, isActive = false, id, img }: Props) {
  const { setcurrentPackage } = usePackages();
  const handelFn = useCallback(() => {
    setcurrentPackage(id);
  }, [id]);
  return (
    <div
      onClick={handelFn}
      className={cn(
        "px-4 rounded-lg bg-white cursor-pointer group border-black border-4 max-w-[250px]",
        isActive ? "border-[#ffd700]" : "",
        "hover:-translate-y-1.5 relative transition duration-300",
      )}
    >
      {isActive ? (
        <div className="bg-[#ffd700] border border-black absolute top-3 left-3 size-8 flex items-center justify-center rounded-full z-100">
          <Crown size={20} fill="white" />
        </div>
      ) : (
        ""
      )}
      <img
        src={img}
        className="z-100 transition duration-300 group-hover:grayscale-100 object-cover rounded-lg mx-auto my-5"
        alt=""
      />
      <div className="my-2 mx-auto text-lg flex justify-center gap-2 items-center font-bold">
        {coins} RBX
      </div>
    </div>
  );
}
