import * as Yup from "yup";

export type TypeValidate =
  | Yup.ObjectSchema<
    {
      productName: string;
      priceOneKg: number;
      nbrDemiKg: number;
      nbrOneKg: number;
    },
    Yup.AnyObject,
    {
      productName: undefined;
      priceOneKg: undefined;
      nbrDemiKg: undefined;
      nbrOneKg: undefined;
    },
    ""
  >
  | null
  | Yup.ObjectSchema<
    {
      nbrDemiKg: number;
    },
    Yup.AnyObject,
    {
      nbrDemiKg: undefined;
    },
    ""
  >
  | Yup.ObjectSchema<
    {
      nbrOneKg: number;
    },
    Yup.AnyObject,
    {
      nbrOneKg: undefined;
    },
    ""
  >
  | Yup.ObjectSchema<{
    nbrKg: string;
  }, Yup.AnyObject, {
    nbrKg: undefined;
  }, "">;

export const validateStock = Yup.object({
  productName: Yup.string().required("Vous devez mettre le nom du produit"),
  priceOneKg: Yup.number()
    .required("Vous devez mettre le prix d'un kilo")
    .min(0, "Ce nombre ne pas être négative")
    .integer("Ce nombre doit être un entier"),
  nbrDemiKg: Yup.number()
    .required("Si vous n'avez pas de sachet de demi kilo, mettez zero")
    .min(0, "Ce nombre ne pas être négative")
    .integer("Ce nombre doit être un entier"),
  nbrOneKg: Yup.number()
    .required("Si vous n'avez pas de sachet d'un kilo, mettez zero")
    .min(0, "Ce nombre ne pas être négative")
    .integer("Ce nombre doit être un entier"),
  nbrKg: Yup.string()
    .required("Si vous stock en kilo, mettez zero")
    .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "doit etre un nombre et doit etre positif")
});

export const validateNbrDemiKg = Yup.object({
  nbrDemiKg: Yup.number()
    .required("Si vous n'avez pas de sachet de demi kilo, mettez zero")
    .min(0, "Ce nombre ne pas être négative")
    .integer("Ce nombre doit être un entier"),
});

export const validateNbrOneKg = Yup.object({
  nbrOneKg: Yup.number()
    .required("Si vous n'avez pas de sachet d'un kilo, mettez zero")
    .min(0, "Ce nombre ne pas être négative")
    .integer("Ce nombre doit être un entier"),
});

export const validateKg = Yup.object({
  nbrKg: Yup.string()
    .required("Si vous stock en kilo, mettez zero")
    .matches(/^(0|[1-9]\d*)(\.\d{1,3})?$/, "doit etre un nombre et doit etre positif et utiliser un point au lieu de virgule, ne doit pas depasser trois chiffre apres virgule")
})
