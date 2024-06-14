export enum TipoAnimal {
  AVES,
  CAPRINOS,
  BOVINOS,
  EQUINOS,
  SUINOS_M,
  SUINOS_F,
  LEITOES,
  BOVINOS_L,
  BEZERROS,
  BOIS_CORTE,
}
export enum TipoFase {
  MONOFASICO,
  BIFASICO,
  TRIFASICO,
}

export type ResponseType = {
  melhor: string;
  aerogerador: ConjuntoResposta<AerogeradoresDadosExtra>;
  fotovoltaico: ConjuntoResposta<FotovoltaicoDadosExtra>;
  biodigestor: ConjuntoResposta<BiodigestorDadosExtra>;
};

export type ConjuntoResposta<T> = {
  lcoe: number;
  tabela: TabelaFinal;
  custoImplantacao: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dadosExtra: T;
};

export type AerogeradoresDadosExtra = {
  aerogerador: Aerogerador;
};

export type FotovoltaicoDadosExtra = {
  painelSolar: PainelSolar;
  inversorSolar: InversorSolar;
  quantidade: number;
};

export type BiodigestorDadosExtra = {
  animal: TipoAnimal;
  numeroMinimoAnimais: number;
};

type BaseEntity = {
  id: string;
  marca: string;
};

export type Aerogerador = BaseEntity & {
  modelo: string;
  potencia: number;
  custoModelo: number;
};

export type InversorSolar = BaseEntity & {
  modelo: string;
  tensaoSaidaMin: number;
  tensaoSaidaMax: number;
  tensaoEntradaMax: number;
  potencia: number;
  valor: number;
};

export type PainelSolar = BaseEntity & {
  modelo: string;
  potencia: number;
  valor: number;
};

export type TabelaFinal = {
  custoImplantacao: DadosTabela[];
  energiaGerada: DadosTabela[];
  manutencao: DadosTabela[];
};

export type DadosTabela = {
  ano: number;
  valor: number;
};
