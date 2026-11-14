import { ComponentProps } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Detalhe: { ponto: Ponto };
};

export type Coordenada = { latitude: number; longitude: number };
export type Categoria = {
  id: CategoriaId;
  nome: string;
  descricao: string;
  icone: keyof typeof MaterialCommunityIcons.glyphMap;
  cor: string;
  fundo: string;
  prioridade: string;
  corPrioridade: string;
};
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

