import { TipoAnimal } from "../infrastructure.types";

export const getAnimalNome = (animal: TipoAnimal) => {
  const dic = {
    [TipoAnimal.AVES]: "Aves",
    [TipoAnimal.BOIS_CORTE]: "Bis de Corte",
    [TipoAnimal.BOVINOS]: "Bovinos",
    [TipoAnimal.BOVINOS_L]: "Bovinos Fêmeas Lactantes",
    [TipoAnimal.BEZERROS]: "Bezerros",
    [TipoAnimal.CAPRINOS]: "Caprinos",
    [TipoAnimal.EQUINOS]: "Equínos",
    [TipoAnimal.LEITOES]: "Leitões",
    [TipoAnimal.SUINOS_F]: "Suínos Fêmeas",
    [TipoAnimal.SUINOS_M]: "Suínos Machos",
  };
  return dic[animal];
};
