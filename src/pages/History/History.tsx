import { months } from "../../assets/ts/histories";
import InputYear from "../../components/InputYear/InputYear";
import useForm from "../../hooks/useForm";
import "./history.scss";
import useFilter from "../../hooks/useFilter";
import useHistory from "../../hooks/useHistory";
import { useEffect, useState } from "react";
import { axiosDefault } from "../../api/axios";
import { toast } from "react-toastify";

const History = () => {
  const formContext = useForm();
  const historyContext = useHistory();
  const histories = useFilter(
    historyContext?.histories,
    formContext?.year,
    formContext?.month
  );
  const [days, setDays] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (formContext?.year && formContext?.month) {
          const res = await axiosDefault.post("/achat/day", {
            year: formContext.year,
            month: formContext.month,
          });

          if (res.data.success) {
            setDays(res.data.days);
          } else toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [formContext?.year, formContext?.month]);

  return (
    <div className="history-container">
      <div className="display-center">
        <InputYear
          values={formContext?.years}
          value={formContext?.year}
          name="Année"
          setValue={formContext?.setYear}
        />
      </div>
      <div className="display-center" style={{ gap: 15 }}>
        <InputYear
          values={months}
          value={formContext?.month}
          name="Mois"
          setValue={formContext?.setMonth}
        />
        <h2>
          Recettes Total :{" "}
          <span style={{ fontWeight: 900 }}>
            {histories && histories.length > 0
              ? histories.reduce((acc, item) => acc + (item.total || 0), 0)
              : 0}
            {" Ar"}
          </span>
        </h2>
      </div>
      <div className="history-content">
        {days &&
          days.length > 0 &&
          days.map((day, index) => (
            <div key={index} className="history-card">
              <span>Jour : {day}</span>
              <span>
                Total :{" "}
                <span style={{ fontSize: 18, fontWeight: 900 }}>
                  {histories && histories.length > 0
                    ? histories
                        .filter((history) => history.day == day)
                        .reduce((acc, item) => acc + (item.total || 0), 0)
                    : 0}
                  {" Ar"}
                </span>
              </span>
              <ul>
                {histories &&
                  histories.length > 0 &&
                  histories
                    .filter((history) => history.day == day)
                    .map((achat, index) => (
                      <li key={index}>
                        <span className="calcul-desc">
                          {achat.type != "gram"
                            ? achat.nbr +
                              " sachet(s) " +
                              achat.type +
                              " kilo de " +
                              achat.product.productName +
                              " X " +
                              achat.price +
                              " ="
                            : achat.nbr * 1000 +
                              "g de " +
                              achat.product.productName +
                              " X " +
                              achat.price +
                              " ="}
                        </span>
                        <span className="calcul-total">
                          {achat.total + " Ar"}
                        </span>
                      </li>
                    ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
