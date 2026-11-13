export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Detalhe: { ponto: Ponto };
};

export type Coordenada = { latitude: number; longitude: number };

export type CategoriaId =
  | 'buracos'
  | 'alagamentos'
  | 'transito'
  | 'lixo'
  | 'iluminacao'
  | 'acessibilidade'
  | 'riscos';

export type Ponto = Coordenada & {
  id: string;
  categoria: CategoriaId;
};
export type Comentario = {
  id: string;
  texto: string;
  data: string; 
};