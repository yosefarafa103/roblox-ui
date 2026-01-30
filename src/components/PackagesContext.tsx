import { createContext, useContext, useState, type ReactNode } from "react";

type PackagesContextType = {
  currentPackage: number;
  setcurrentPackage: (term: number) => void;
};

const PackagesContext = createContext<PackagesContextType | undefined>(
  undefined
);

export const PackagesProvider = ({ children }: { children: ReactNode }) => {
  const [currentPackage, setcurrentPackage] = useState<number>(0);

  return (
    <PackagesContext.Provider value={{ currentPackage, setcurrentPackage }}>
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => {
  const context = useContext(PackagesContext);
  if (!context)
    throw new Error("usePackages must be used within PackagesProvider");
  return context;
};
