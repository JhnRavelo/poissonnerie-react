import { columnStocks, stockFields } from "../../assets/ts/stocks";
import AddButton from "../../components/AddButton/AddButton";
import DataTable from "../../components/DataTable/DataTable";
import useForm from "../../hooks/useForm";
import useStock from "../../hooks/useStock";
import { validateStock } from "../../utils/validate";

const Stock = () => {
  const formContext = useForm();
  const stockContext = useStock();
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
      <DataTable columns={columnStocks} rows={stockContext?.stocks} slug="stock" />
    </>
  );
};

export default Stock;
