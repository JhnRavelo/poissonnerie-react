import useForm from "../../hooks/useForm";
import Delete from "./Delete/Delete";
import FormFields from "../AddForm/AddForm";
import "./modal.scss";
import { TypeData } from "../../context/StockContext";

const Modal = () => {
  const formContext = useForm();
  const updated = formContext?.updated;
  const initialValues: TypeData =
    formContext?.url === "/stock" && updated
      ? {
          productName: updated.productName,
          priceOneKg: updated.priceOneKg,
          nbrDemiKg: updated.nbrDemiKg,
          nbrOneKg: updated.nbrOneKg,
        }
      : formContext?.url === "/stock/demiKg"
      ? { nbrDemiKg: null }
      : formContext?.url === "/stock/oneKg"
      ? { nbrOneKg: null }
      : { productName: "", priceOneKg: null, nbrDemiKg: null, nbrOneKg: null };

  return (
    <div className="add">
      <div
        className="modal"
        style={
          formContext?.type == "delete"
            ? { width: "350px", height: "300px" }
            : {}
        }
      >
        <span className="close" onClick={() => formContext?.setOpenForm(false)}>
          X
        </span>
        {formContext?.type != "delete" ? (
          <>
            <h3>{formContext?.title}</h3>
            <FormFields initialValues={initialValues} />
          </>
        ) : (
          <Delete />
        )}
      </div>
    </div>
  );
};

export default Modal;
