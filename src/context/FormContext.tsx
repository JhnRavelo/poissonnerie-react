import { createContext, useState } from "react";
import { ProviderPropsType, TypeData } from "./StockContext";
import { TypeValidate } from "../utils/validate";

export type TypeTypeModal = "add" | "delete" | "update";

export type TypeUrl = "/stock" | "" | "/stock/demiKg" | "/stock/oneKg";

export type TypeAddFormFields = {
  name: "productName" | "nbrDemiKg" | "nbrOneKg" | "priceOneKg";
  header: string;
  type: string;
  placeholder: string;
}[];

type TypeAddFormContext = {
  openForm: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  formFields: TypeAddFormFields;
  setFormFields: React.Dispatch<React.SetStateAction<TypeAddFormFields>>;
  type: TypeTypeModal;
  setType: React.Dispatch<React.SetStateAction<TypeTypeModal>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  isFetch: boolean;
  setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: TypeData | null;
  setDeleted: React.Dispatch<React.SetStateAction<TypeData | null>>;
  url: TypeUrl;
  setUrl: React.Dispatch<React.SetStateAction<TypeUrl>>;
  updated: TypeData | null;
  setUpdated: React.Dispatch<React.SetStateAction<TypeData | null>>;
  years: string[];
  setYears: React.Dispatch<React.SetStateAction<string[]>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  validate: TypeValidate;
  setValidate: React.Dispatch<React.SetStateAction<TypeValidate>>;
};

const FormContext = createContext<TypeAddFormContext | null>(null);

export const FormProvider = ({ children }: ProviderPropsType) => {
  const [type, setType] = useState<TypeTypeModal>("add");
  const [title, setTitle] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [validate, setValidate] = useState<TypeValidate>(null);
  const [formFields, setFormFields] = useState<TypeAddFormFields>([]);
  const [isFetch, setIsFetch] = useState(false);
  const [deleted, setDeleted] = useState<TypeData | null>(null);
  const [updated, setUpdated] = useState<TypeData | null>(null);
  const [url, setUrl] = useState<TypeUrl>("");
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState<string>(() => {
    const date = new Date();
    return date.getFullYear().toString();
  });

  return (
    <FormContext.Provider
      value={{
        openForm,
        setOpenForm,
        isFetch,
        setIsFetch,
        validate,
        setValidate,
        formFields,
        setFormFields,
        title,
        setTitle,
        type,
        setType,
        deleted,
        setDeleted,
        url,
        setUrl,
        updated,
        setUpdated,
        years,
        setYears,
        year,
        setYear,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
