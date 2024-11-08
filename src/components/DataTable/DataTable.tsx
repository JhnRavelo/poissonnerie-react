import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import WeightSVG from "../../assets/svg/WeightSVG";
import PlusBoldSVG from "../../assets/svg/PlusBoldSVG";
import EditSVG from "../../assets/svg/EditSVG";
import DeleteSVG from "../../assets/svg/DeleteSVG";

type DataTablePropsType = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: DataTablePropsType) => {
  // const handleDelete = (id: number) => {};

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 360,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="weight-container">
            <div className="kg-container">
              <WeightSVG width="40" height="40" />
              <span>1 Kg</span>
            </div>
            <PlusBoldSVG width="15" height="15" className="weight-plus" />
          </div>
          <div className="weight-container">
            <div className="kg-container">
              <WeightSVG width="40" height="40" />
              <span style={{fontSize:9}}>1/2Kg</span>
            </div>
            <PlusBoldSVG width="15" height="15" className="weight-plus" />
          </div>
          <div className="svg-action" style={{color: "green"}}>
            <EditSVG width="30" height="30" />
          </div>
          <div className="svg-action" style={{color: "red"}}>
            <DeleteSVG width="30" height="30"/>
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
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
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
