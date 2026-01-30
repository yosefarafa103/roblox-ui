import { createContext, useState, type ReactNode } from "react";

type InputContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const InputContext = createContext<InputContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const InputProvider = ({ children }: Props) => {
  const [value, setValue] = useState<string>("");

  return (
    <InputContext.Provider value={{ value, setValue }}>
      {children}
    </InputContext.Provider>
  );
};
