import { createContext, useContext, useState, type ReactNode } from "react";

interface Player {
  id: string;
  name: string;
  displayName: string;
  hasVerifiedBadge: boolean;
  created?: string;
  img: string;
}

interface PlayerData {
  data: Player[] | Player;
  avatarImg: string;
}

type PlayerDataContextType = {
  playerData: PlayerData | null;
  setPlayerData: React.Dispatch<React.SetStateAction<PlayerData | null>>;
};

const PlayerDataContext = createContext<PlayerDataContextType | null>(null);

export const PlayerDataProvider = ({ children }: { children: ReactNode }) => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  return (
    <PlayerDataContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerDataContext.Provider>
  );
};

export const usePlayerData = () => {
  const context = useContext(PlayerDataContext);
  if (!context)
    throw new Error("usePlayerData must be used within PlayerDataProvider");
  return context;
};
