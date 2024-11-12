import useForm from "../../hooks/useForm";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "./addForm.scss";
import ErrorForm from "./ErrorForm/ErrorForm";
import { TypeData } from "../../context/StockContext";
import { axiosDefault } from "../../api/axios";

type FormFieldsPropsType = {
  initialValues: TypeData;
};

const FormFields = ({ initialValues }: FormFieldsPropsType) => {
  const formContext = useForm();
  const [error, setError] = useState("");

  const handleSubmit = async (values: TypeData) => {
    if (!values) {
      toast.error("Erreur valeur nulle");
      return;
    }
    const formData = new FormData();
    const valuesEntries = Object.entries(values);
    formData.append("id", `${formContext?.updated?.id}`);
    valuesEntries.forEach(([key, value]) => {
      formData.append(`${key}`, value ? value.toString() : "");
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
              <div className="button-container">
                <button
                  type="submit"
                  onClick={() => {
                    formContext?.formFields.map((item) => {
                      if (errors[item.name]) {
                        toast.error(errors[item.name]);
                      }
                    });
                  }}
                >
                  Enregistrer
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </>
  );
};

export default FormFields;
