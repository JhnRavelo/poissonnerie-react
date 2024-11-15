import { columnAchats } from "../../assets/ts/achats";
import DataTable from "../../components/DataTable/DataTable";
import FormButton from "../../components/FormButton/FormButton";
import useAchat from "../../hooks/useAchat";
import useStock from "../../hooks/useStock";
import "./achat.scss";

const Achat = () => {
  const stockContext = useStock();
  const achatContext = useAchat();
  console.log(achatContext?.achats);
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
                    {achat.nbr +
                      " sachet(s) " +
                      `${achat.field == "nbrDemiKg" ? "de demi" : "d'un"}` +
                      " kilo de " +
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
            <FormButton title="Confirmez" type="button" onClick={() => {}} />
            <FormButton
              title="Annulez"
              type="button"
              onClick={() => {}}
              style={{ background: "red" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achat;
