import { createContext, useState } from "react";
import { NbrNull, ProviderPropsType } from "./StockContext";

export type AchatType = {
  id?: number;
  field: string;
  productName: string;
  nbr: number;
  price?: NbrNull;
  total: NbrNull;
};

export type AchatTypes = AchatType[];

type AchatContextType = {
  achats: AchatTypes;
  setAchats: React.Dispatch<React.SetStateAction<AchatTypes>>;
} | null;

const AchatContext = createContext<AchatContextType>(null);

const AchatProvider = ({ children }: ProviderPropsType) => {
  const [achats, setAchats] = useState<AchatTypes>([]);
  return (
    <AchatContext.Provider value={{ achats, setAchats }}>
      {children}
    </AchatContext.Provider>
  );
};

export { AchatProvider };

export default AchatContext;
