import React, { createContext, useState } from "react";

export type ProviderPropsType = {
  children: React.ReactNode;
};

export type NbrNull = number | null;

export type TypeData = {
  id?: number;
  productName?: string;
  nbrDemiKg?: NbrNull;
  nbrOneKg?: NbrNull;
  priceOneKg?: NbrNull;
};

export type TypeDatas = TypeData[];

type TypeStockContext = {
  stocks: TypeDatas;
  setStocks: React.Dispatch<React.SetStateAction<TypeDatas>>;
} | null;

const StockContext = createContext<TypeStockContext>(null);

export const StockProvider = ({ children }: ProviderPropsType) => {
  const [stocks, setStocks] = useState<TypeDatas>([]);
  return (
    <StockContext.Provider value={{ stocks, setStocks }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
