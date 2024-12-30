/* eslint-disable react-hooks/exhaustive-deps */
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import "./nbrSachet.scss";
import MoinsCircleSVG from "../../assets/svg/MoinsCircleSVG";
import { useEffect, useMemo, useState } from "react";
import useAchat from "../../hooks/useAchat";
import { TypeData } from "../../context/StockContext";
import useForm from "../../hooks/useForm";
import { validateKg } from "../../utils/validate";
import { stockFields } from "../../assets/ts/stocks";

type NbrSachetPropsType = {
  params: GridRenderCellParams<
    TypeData,
    string | number,
    string,
    GridTreeNodeWithRender
  >;
};
const NbrSachet = ({ params }: NbrSachetPropsType) => {
  const achatContext = useAchat();
  const formContext = useForm();
  const [once, setOnce] = useState(true);
  const [value, setValue] = useState<string | number | undefined>(params.value);
  // const [id, setId] = useState<number | undefined>();

  useEffect(() => {
    if (once && params.value && params.field != "nbrKg") {
      setValue(params.value);
      setOnce(false);
    }
    if (achatContext?.action === "reset") {
      setValue(params.value);
      achatContext.setAction("decrease");
    }
  }, [achatContext?.action, params]);

  useMemo(() => {
    if (params.field === "nbrKg" && achatContext?.values && achatContext.values.length > 0) {
      const findKg = achatContext.values.find(item => item.id == params.id);
      if (findKg) {
        setValue(findKg.nbrKg);
      }
    }
  }, [params, achatContext?.values])

  // useMemo(() => {
  //   if (
  //     params.field === "nbrKg" &&
  //     achatContext?.kg &&
  //     achatContext.kg != "0" &&
  //     id && id === params.row.id &&
  //     params.value
  //   ) {
  //     achatContext?.setValue((prev) => {
  //       if (prev && prev > 0) {
  //         achatContext?.setAchats((prev) => {
  //           const price = params?.row?.priceOneKg ? params?.row?.priceOneKg : 0;
  //           if (
  //             prev.length > 0 &&
  //             params?.row?.id &&
  //             prev.find((item) => item.id === id && item.field === "nbrKg")
  //           ) {
  //             return prev.map((item) => {
  //               if (item.id === id && item.field === params.field) {
  //                 return {
  //                   ...item,
  //                   nbr: parseFloat(achatContext.kg),
  //                   total: Math.floor((parseFloat(achatContext.kg) * price) / 100) *
  //                   100,
  //                 };
  //               }
  //               return item;
  //             });
  //           } else
  //             return [
  //               ...prev,
  //               {
  //                 id: id,
  //                 field: params.field,
  //                 productName: params.row.productName || "",
  //                 nbr: parseFloat(achatContext.kg),
  //                 price,
  //                 total:
  //                   Math.floor((parseFloat(achatContext.kg) * price) / 100) *
  //                   100,
  //               },
  //             ];
  //         });
  //         if (params.value) {
  //           return Number((params.value - parseFloat(achatContext?.kg)).toFixed(3));
  //         } else return 0
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }
  // }, [formContext?.openForm, params.field, id, params.value, achatContext?.kg]);

  return (
    <div className="nbr-sachet-container">
      <span>{value ? value : 0}</span>
      <MoinsCircleSVG
        width="25"
        height="25"
        onClick={() => {
          if (params.field === "nbrKg") {
            const stockFieldKg = stockFields.filter(
              (field) => field.name == params.field
            );
            // setId(params.row.id);
            formContext?.setOpenForm(true);
            formContext?.setType("kg");
            formContext?.setUrl("/stock/Kg");
            formContext?.setUpdated(params.row);
            formContext?.setValidate(validateKg);
            formContext?.setFormFields(stockFieldKg);
            formContext?.setTitle("Le nombre de kilo a acheter");
            return;
          } else {
            setValue((prev) => {
              if (prev && Number(prev) > 0) {
                achatContext?.setAchats((prev) => {
                  const price =
                    params.field == "nbrDemiKg" && params?.row?.priceOneKg
                      ? params?.row?.priceOneKg / 2
                      : params.field == "nbrOneKg" && params?.row?.priceOneKg
                      ? params?.row?.priceOneKg
                      : 0;
                  if (prev.length == 0) {
                    return [
                      {
                        id: params.row.id,
                        field: params.field,
                        productName: params.row.productName || "",
                        nbr: 1,
                        price,
                        total: price,
                      },
                    ];
                  } else if (
                    prev.length > 0 &&
                    params?.row?.id &&
                    prev.find(
                      (item) =>
                        item.id === params.row.id && item.field === params.field
                    )
                  ) {
                    return prev.map((item) => {
                      if (
                        item.id === params.row.id &&
                        item.field === params.field
                      ) {
                        return {
                          ...item,
                          nbr: item.nbr + 1,
                          total: price * (item.nbr + 1),
                        };
                      }
                      return item;
                    });
                  } else {
                    return [
                      ...prev,
                      {
                        id: params.row.id,
                        field: params.field,
                        productName: params.row.productName || "",
                        nbr: 1,
                        price,
                        total: price,
                      },
                    ];
                  }
                });
                return Number(prev) - 1;
              } else {
                return 0;
              }
            });
          }

        }}
      />
    </div>
  );
};

export default NbrSachet;
