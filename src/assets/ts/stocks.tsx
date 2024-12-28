import { GridColDef } from "@mui/x-data-grid";
import { TypeAddFormFields } from "../../context/FormContext";

export const columnStocks: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    type: "string",
  },
  {
    field: "productName",
    headerName: "Nom du produit",
    width: 200,
    type: "string",
  },
  {
    field: "nbrDemiKg",
    headerName: "Nombre de sachet 0.5Kg",
    width: 200,
    type: "string",
  },
  {
    field: "nbrOneKg",
    headerName: "Nombre de sachet 1Kg",
    width: 180,
    type: "string",
  },
  {
    field: "nbrKg",
    headerName: "Stock en Kg",
    width: 150,
    type: "string",
  },
  {
    field: "priceOneKg",
    headerName: "Prix par Kg en Ar",
    width: 150,
    type: "string",
  },
];

export const stockFields: TypeAddFormFields = [
  {
    name: "productName",
    header: "Nom du produit",
    type: "text",
    placeholder: "Nom du produit stocké",
  },
  {
    name: "priceOneKg",
    header: "Prix par Kg en Ar",
    type: "number",
    placeholder: "Le prix en Ar de ce produit en Kg",
  },
  {
    name: "nbrDemiKg",
    header: "Nombre de sachet 0.5Kg",
    type: "number",
    placeholder: "Nombre de sachet de 1/2Kg en stock de ce produit",
  },
  {
    name: "nbrOneKg",
    header: "Nombre de sachet 1Kg",
    type: "number",
    placeholder: "Nombre de sachet d'1Kg en stock de ce produit",
  },
  {
    name: "nbrKg",
    header: "Nombre en stock en Kg",
    type: "text",
    placeholder: "Nombre en stock de ce produit en Kg",
  },

];