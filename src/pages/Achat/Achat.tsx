/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { columnAchats } from "../../assets/ts/achats";
import DataTable from "../../components/DataTable/DataTable";
import FormButton from "../../components/FormButton/FormButton";
import useAchat from "../../hooks/useAchat";
import useStock from "../../hooks/useStock";
import "./achat.scss";
import { TypeDatas } from "../../context/StockContext";
import { axiosDefault } from "../../api/axios";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

const Achat = () => {
  const stockContext = useStock();
  const achatContext = useAchat();
  const formContext = useForm();
  const [once, setOnce] = useState(true);

  const handleAchat = async () => {
    if (achatContext?.achats && achatContext?.achats.length > 0) {
      const formData: { allAchats: TypeDatas } = {
        allAchats: achatContext.achats,
      };
      try {
        const res = await axiosDefault.post("/achat", formData);
        if (res.data.success) {
          formContext?.setIsFetch((prev) => !prev);
          achatContext.setAchats([]);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Erreur serveur");
        console.log(error);
      }
    } else toast.error("Pas d'achats");
  };

  useEffect(() => {
    if (stockContext?.stocks && stockContext.stocks.length > 0 && once) {
      achatContext?.setAchats([]);
      achatContext?.setValues(stockContext.stocks);
      setOnce(false);
    }
  }, [once, stockContext?.stocks]);

  return (
    <div className="achat-container">
      <div className="dataTable-container">
        <DataTable
          columns={columnAchats}
          rows={stockContext?.stocks}
          slug="achat"
        />
      </div>
      <div className="calcul-container">
        <h2>Calcul des Achats</h2>
        <div className="calcul-content">
          <ul>
            {achatContext?.achats &&
              achatContext?.achats.length > 0 &&
              achatContext?.achats.map((achat, index) => (
                <li key={index}>
                  <span className="calcul-desc">
                    {achat.field != "nbrKg"
                      ? achat.nbr +
                        " sachet(s) " +
                        `${achat.field == "nbrDemiKg" ? "de demi" : "d'un"}` +
                        " kilo de " +
                        achat.productName +
                        " X " +
                        achat.price +
                        " ="
                      : achat.nbr * 1000 +
                        "g de " +
                        achat.productName +
                        " X " +
                        achat.price +
                        " ="}
                  </span>
                  <span className="calcul-total">{achat.total + " Ar"}</span>
                </li>
              ))}
          </ul>
          <div className="achat-total">
            <span>Total:</span>
            <span className="calcul-total">
              {achatContext?.achats && achatContext.achats.length > 0
                ? achatContext.achats.reduce(
                    (acc, item) => acc + (item.total || 0),
                    0
                  )
                : 0}{" "}
              Ar
            </span>
          </div>
          <div className="achat-button">
            <FormButton
              title="Confirmez"
              type="button"
              onClick={() => handleAchat()}
            />
            <FormButton
              title="Annulez"
              type="button"
              onClick={() => {
                achatContext?.setAchats([]);
                achatContext?.setAction("reset");
              }}
              style={{ background: "red" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achat;
