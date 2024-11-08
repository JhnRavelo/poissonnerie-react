import { columnStocks } from "../../assets/ts/stocks";
import AddButton from "../../components/AddButton/AddButton";
import DataTable from "../../components/DataTable/DataTable";
import { TypeDatas } from "../../context/StockContext";

const rows: TypeDatas = [
  {
    id: 1,
    productName: "Cameron",
    nbrDemiKg: 23,
    nbrOneKg: 43,
    priceOneKg: 40000,
  },
];

const Stock = () => {
  const handleClick = () => {};
  return (
    <div>
      <AddButton handleClick={handleClick} />
      <DataTable columns={columnStocks} rows={rows} slug="stock" />
    </div>
  );
};

export default Stock;
