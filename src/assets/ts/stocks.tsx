import { GridColDef } from "@mui/x-data-grid";

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
    field: "priceOneKg",
    headerName: "Prix par Kg en Ar",
    width: 180,
    type: "string",
  },
];
