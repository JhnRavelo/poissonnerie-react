import { columnStocks, stockFields } from "../../assets/ts/stocks";
import AddButton from "../../components/AddButton/AddButton";
import DataTable from "../../components/DataTable/DataTable";
import { TypeDatas } from "../../context/StockContext";
import useForm from "../../hooks/useForm";
import { validateStock } from "../../utils/validate";

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
  const formContext = useForm();
  const handleClick = () => {
    formContext?.setValidate(validateStock);
    formContext?.setOpenForm(true);
    formContext?.setFormFields(stockFields);
    formContext?.setUrl("/stock");
    formContext?.setTitle("Ajouter un nouveau produit");
    formContext?.setType("add");
    formContext?.setUpdated(null);
  };
  return (
    <>
      <AddButton handleClick={handleClick} />
      <DataTable columns={columnStocks} rows={rows} slug="stock" />
    </>
  );
};

export default Stock;
