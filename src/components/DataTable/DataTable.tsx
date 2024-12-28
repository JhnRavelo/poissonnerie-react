import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import WeightSVG from "../../assets/svg/WeightSVG";
import PlusBoldSVG from "../../assets/svg/PlusBoldSVG";
import EditSVG from "../../assets/svg/EditSVG";
import DeleteSVG from "../../assets/svg/DeleteSVG";
import useForm from "../../hooks/useForm";
import { stockFields } from "../../assets/ts/stocks";
import {
  validateKg,
  validateNbrDemiKg,
  validateNbrOneKg,
  validateStock,
} from "../../utils/validate";
import { TypeData, TypeDatas } from "../../context/StockContext";

type DataTablePropsType = {
  columns: GridColDef[];
  rows: TypeDatas | undefined;
  slug: string;
};

type TypeHandleAddStock = (
  name: "nbrOneKg" | "nbrDemiKg" | "nbrKg",
  row: TypeData
) => void;

type TypeHandleAction = (row: TypeData) => void;

const DataTable = (props: DataTablePropsType) => {
  const formContext = useForm();

  const handleAddStock: TypeHandleAddStock = (name, row) => {
    const firstPartTitle = "Ajouter ";
    const stockFieldForAddStock = stockFields.filter(
      (field) => field.name == name
    );
    formContext?.setFormFields(stockFieldForAddStock);
    formContext?.setOpenForm(true);
    formContext?.setUrl(
      name === "nbrDemiKg" ? "/stock/demiKg" : name === "nbrKg" ? "/stock/Kg" : "/stock/oneKg"
    );
    formContext?.setType("add");
    formContext?.setTitle(
      name === "nbrDemiKg"
        ? firstPartTitle + " des sachets de demi kilo"
        : name === "nbrKg" ? firstPartTitle + " des stocks en Kg"
          : firstPartTitle + " des sachets d'un kilo"
    );
    formContext?.setValidate(
      name === "nbrDemiKg" ? validateNbrDemiKg : name === "nbrKg" ? validateKg : validateNbrOneKg
    );
    formContext?.setUpdated(row);
  };

  const handleEdit: TypeHandleAction = (row) => {
    formContext?.setOpenForm(true);
    formContext?.setUrl("/stock");
    formContext?.setFormFields(stockFields);
    formContext?.setUpdated(row);
    formContext?.setType("update");
    formContext?.setTitle("Modifier ce produit");
    formContext?.setValidate(validateStock);
  };

  const handleDelete: TypeHandleAction = (row) => {
    formContext?.setOpenForm(true);
    formContext?.setType("delete");
    formContext?.setUrl("/stock");
    formContext?.setDeleted(row);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 300,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="action">
          <div
            className="weight-container"
            onClick={() => handleAddStock("nbrOneKg", params.row)}
          >
            <div className="kg-container">
              <WeightSVG width="40" height="40" />
              <span>1 Kg</span>
            </div>
            <PlusBoldSVG width="15" height="15" className="weight-plus" />
          </div>
          <div
            className="weight-container"
            onClick={() => handleAddStock("nbrDemiKg", params.row)}
          >
            <div className="kg-container">
              <WeightSVG width="40" height="40" />
              <span style={{ fontSize: 9 }}>1/2Kg</span>
            </div>
            <PlusBoldSVG width="15" height="15" className="weight-plus" />
          </div>
          <div
            className="weight-container"
            onClick={() => handleAddStock("nbrKg", params.row)}
          >
            <div className="kg-container">
              <WeightSVG width="40" height="40" />
            </div>
            <PlusBoldSVG width="15" height="15" className="weight-plus without" />
          </div>
          <div
            className="svg-action"
            style={{ color: "green" }}
            onClick={() => handleEdit(params.row)}
          >
            <EditSVG width="30" height="30" />
          </div>
          <div
            className="svg-action"
            style={{ color: "red" }}
            onClick={() => handleDelete(params.row)}
          >
            <DeleteSVG width="30" height="30" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={
          props.slug == "stock"
            ? [...props.columns, actionColumn]
            : [...props.columns]
        }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        rowHeight={40}
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        disableColumnMenu
        disableColumnSorting
        disableMultipleRowSelection
      />
    </div>
  );
};

export default DataTable;
