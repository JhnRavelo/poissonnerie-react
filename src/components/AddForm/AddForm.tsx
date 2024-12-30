import useForm from "../../hooks/useForm";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "./addForm.scss";
import ErrorForm from "./ErrorForm/ErrorForm";
import { TypeData } from "../../context/StockContext";
import { axiosDefault } from "../../api/axios";
import FormButton from "../FormButton/FormButton";
import useAchat from "../../hooks/useAchat";
import useStock from "../../hooks/useStock";

type FormFieldsPropsType = {
  initialValues: TypeData;
};

const FormFields = ({ initialValues }: FormFieldsPropsType) => {
  const formContext = useForm();
  const [error, setError] = useState("");
  const achatContext = useAchat();
  const stockContext = useStock();

  const handleSubmit = async (values: TypeData) => {
    if (!values) {
      toast.error("Erreur valeur nulle");
      return;
    }
    if (
      formContext?.type === "kg" &&
      values?.nbrKg &&
      formContext.updated?.nbrKg &&
      formContext.updated?.id &&
      // achatContext?.values &&
      stockContext?.stocks &&
      stockContext.stocks.length > 0
    ) {
      if (formContext.updated?.nbrKg < values.nbrKg) {
        toast.error("Ne peut pas acheter un kilo plus grand que le stock");
        return;
      }
      achatContext?.setValues((prev) => {
        if (prev.length > 0) {
          achatContext?.setAchats((prev) => {
            const price = formContext?.updated?.priceOneKg
              ? formContext?.updated?.priceOneKg
              : 0;
            if (
              prev.length > 0 &&
              formContext?.updated?.id &&
              prev.find(
                (item) =>
                  item.id === formContext?.updated?.id && item.field === "nbrKg"
              )
            ) {
              return prev.map((item) => {
                if (
                  item.id === formContext?.updated?.id &&
                  item.field === "nbrKg"
                ) {
                  return {
                    ...item,
                    nbr: parseFloat(values.nbrKg || "0") + item.nbr,
                    total:
                      Math.floor(
                        ((parseFloat(values.nbrKg || "0") + item.nbr) * price) / 100
                      ) * 100,
                  };
                }
                return item;
              });
            } else
              return [
                ...prev,
                {
                  id: formContext.updated?.id,
                  field: "nbrKg",
                  productName: formContext.updated?.productName || "",
                  nbr: parseFloat(values.nbrKg || "0"),
                  price,
                  total:
                    Math.floor(
                      (parseFloat(values.nbrKg || "0") * price) / 100
                    ) * 100,
                },
              ];
          });
          return prev.map((item) => {
            if (
              item.id == formContext.updated?.id &&
              item.nbrKg &&
              values.nbrKg
            ) {
              return {
                ...item,
                nbrKg: (
                  parseFloat(item.nbrKg) - parseFloat(values.nbrKg)
                ).toFixed(3),
              };
            } else return item;
          });
        } else {
          return [];
        }
      });
      // achatContext?.setKg(values.nbrKg);
      formContext?.setOpenForm(false);
      formContext.setUpdated(null);
    } else {
      const formData = new FormData();
      const valuesEntries = Object.entries(values);
      formData.append("id", `${formContext?.updated?.id}`);
      valuesEntries.forEach(([key, value]) => {
        formData.append(`${key}`, value.toString());
      });

      try {
        let res;

        if (formContext?.type === "add") {
          res = await axiosDefault.post(formContext.url, formData);
        } else if (formContext?.type === "update")
          res = await axiosDefault.put(formContext?.url, formData);

        if (res?.data.success) {
          toast.success(res.data.message);
          formContext?.setOpenForm(false);
          formContext?.setIsFetch((prev) => !prev);
          formContext?.setUpdated(null);
          setError("");
        } else {
          toast.error(res?.data.message);
          setError(res?.data.message);
        }
      } catch (error) {
        toast.error("Erreur serveur");
        setError("Erreur serveur");
        console.log(error);
      }
    }
  };

  return (
    <>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(value) => handleSubmit(value)}
          validationSchema={formContext?.validate}
          enableReinitialize={true}
        >
          {({ errors }) => (
            <Form>
              <div className="campagne-input-add">
                {formContext?.formFields &&
                  formContext?.formFields.length > 0 &&
                  formContext?.formFields.map((form, index) => (
                    <div className="input-container" key={index}>
                      <label htmlFor={form.name}>{form.header}</label>
                      <Field
                        type={form.type}
                        placeholder={form.placeholder}
                        name={form.name}
                        id={form.name}
                      />
                      <ErrorForm error={error} errors={errors[form.name]} />
                    </div>
                  ))}
              </div>
              <FormButton
                onClick={() => {
                  formContext?.formFields.map((item) => {
                    if (errors[item.name]) {
                      toast.error(errors[item.name]);
                    }
                  });
                }}
                title="Enregistrer"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      ) : null}
    </>
  );
};

export default FormFields;
