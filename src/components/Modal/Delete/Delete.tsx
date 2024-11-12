import imgDelete from "../../../assets/png/poubelle.png";
import { toast } from "react-toastify";
import useForm from "../../../hooks/useForm";
import { axiosDefault } from "../../../api/axios";

const Delete = () => {
  const formContext = useForm();

  const handleDelete = async () => {
    try {
      if (!formContext?.url) return;
      const res = await axiosDefault.delete(
        formContext.url + "/" + formContext.deleted?.id
      );
      if (res.data.success) {
        formContext?.setIsFetch((prev) => !prev);
        toast.success(res.data.message);
        formContext.setOpenForm(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Erreur de suppression");
      console.log(error);
    }
  };

  return (
    <>
      <div className="delete-title-container">
        <img src={imgDelete} alt="image poubelle" />
        <h3>Suppression</h3>
      </div>
      <div className="para-container">
        <p>
          Vous êtes sûre de vouloir supprimer le{" "}
          {formContext?.deleted?.productName} de l'application ?
        </p>
      </div>
      <div className="button__delete">
        <button onClick={() => handleDelete()}>Confirmez</button>
        <button
          className="cancel"
          onClick={() => formContext?.setOpenForm(false)}
        >
          Annuler
        </button>
      </div>
    </>
  );
};

export default Delete;
