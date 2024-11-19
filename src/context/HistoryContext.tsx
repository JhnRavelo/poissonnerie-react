import { createContext, useState } from "react";
import { NbrNull, ProviderPropsType } from "./StockContext";

export type HistoryType = {
  id: number;
  nbr: number;
  price: NbrNull;
  total: NbrNull;
  type: "d'un" | "de demi";
  year: string;
  month: string;
  day: string;
  product: { productName: string };
};

export type HistoryTypes = HistoryType[];

type HistoryContextType = {
  histories: HistoryTypes;
  setHistories: React.Dispatch<React.SetStateAction<HistoryTypes>>;
} | null;

const HistoryContext = createContext<HistoryContextType>(null);

export const HistoryProvider = ({ children }: ProviderPropsType) => {
  const [histories, setHistories] = useState<HistoryTypes>([]);
  return (
    <HistoryContext.Provider value={{ histories, setHistories }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
