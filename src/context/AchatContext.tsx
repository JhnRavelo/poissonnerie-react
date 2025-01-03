import { createContext, useState } from "react";
import { NbrNull, ProviderPropsType, TypeDatas } from "./StockContext";

export type AchatType = {
  id?: number;
  field: string;
  productName: string;
  nbr: number;
  price: NbrNull;
  total: NbrNull;
};

export type ActionType = "reset" | "decrease";

export type AchatTypes = AchatType[];

type AchatContextType = {
  achats: AchatTypes;
  setAchats: React.Dispatch<React.SetStateAction<AchatTypes>>;
  action: ActionType;
  setAction: React.Dispatch<React.SetStateAction<ActionType>>;
  // kg: string;
  // setKg: React.Dispatch<React.SetStateAction<string>>;
  values: TypeDatas;
  setValues: React.Dispatch<React.SetStateAction<TypeDatas>>;
} | null;

const AchatContext = createContext<AchatContextType>(null);

const AchatProvider = ({ children }: ProviderPropsType) => {
  const [achats, setAchats] = useState<AchatTypes>([]);
  const [action, setAction] = useState<ActionType>("decrease");
  // const [kg, setKg] = useState("0");
  const [values, setValues] = useState<TypeDatas>([]);
  return (
    <AchatContext.Provider
      value={{
        achats,
        setAchats,
        action,
        setAction,
        // kg,
        // setKg,
        values,
        setValues,
      }}
    >
      {children}
    </AchatContext.Provider>
  );
};

export { AchatProvider };

export default AchatContext;
