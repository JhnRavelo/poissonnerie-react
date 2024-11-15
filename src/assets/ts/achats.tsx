import { GridColDef } from "@mui/x-data-grid";
import NbrSachet from "../../components/NbrSachet/NbrSachet";

export const columnAchats: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    type: "string",
  },
  {
    field: "productName",
    headerName: "Produit",
    width: 150,
    type: "string",
  },
  {
    field: "nbrDemiKg",
    headerName: "Demi Kg",
    headerAlign: "center",
    width: 100,
    type: "string",
    renderCell: (params) => {
      return <NbrSachet params={params} />;
    },
  },
  {
    field: "nbrOneKg",
    headerName: "Un Kg",
    headerAlign: "center",
    width: 100,
    type: "string",
    renderCell: (params) => {
      return <NbrSachet params={params} />;
    },
  },
];
