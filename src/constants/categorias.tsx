import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { CategoriaId } from '../types';

export type Categoria = {
    id: CategoriaId;
    nome: string;
    descricao: string;
    icone: ComponentProps<typeof MaterialCommunityIcons>['name'];
    cor: string;    
    fundo: string;     
    prioridade: string;
    corPrioridade: string;
};

export const CATEGORIAS: Categoria[] = [
    {
        id: 'buracos',
        nome: 'Buracos e vias danificadas',
        descricao: 'Buracos, asfalto quebrado, calçadas danificadas e rachaduras.',
        icone: 'road-variant',
        cor: '#E5484D',
        fundo: '#FDE8E8',
        prioridade: 'Alta prioridade',
        corPrioridade: '#E5484D',
    },
    {
        id: 'alagamentos',
        nome: 'Alagamentos',
        descricao: 'Ruas alagadas, enchentes, bueiros entupidos e pontos de inundação.',
        icone: 'weather-pouring',
        cor: '#3B8FE0',
        fundo: '#E3F1FD',
        prioridade: 'Alta prioridade',
        corPrioridade: '#E5484D',
    },
    {
        id: 'transito',
        nome: 'Trânsito e bloqueios',
        descricao: 'Acidentes, obras, interdições, congestionamentos e obstáculos na pista.',
        icone: 'traffic-cone',
        cor: '#F08A24',
        fundo: '#FFF0DB',
        prioridade: 'Atenção',
        corPrioridade: '#F08A24',
    },
    {
        id: 'lixo',
        nome: 'Lixo e limpeza urbana',
        descricao: 'Descarte irregular, entulho, lixo acumulado e terrenos sujos.',
        icone: 'trash-can-outline',
        cor: '#7C5CD6',
        fundo: '#EDE8FB',
        prioridade: 'Moderada',
        corPrioridade: '#6B7280',
    },
    {
        id: 'iluminacao',
        nome: 'Iluminação pública',
        descricao: 'Postes apagados, lâmpadas quebradas e iluminação insuficiente.',
        icone: 'lightbulb-on-outline',
        cor: '#E0A800',
        fundo: '#FFF6D6',
        prioridade: 'Atenção',
        corPrioridade: '#F08A24',
    },
    {
        id: 'acessibilidade',
        nome: 'Acessibilidade',
        descricao: 'Rampas inexistentes, calçadas obstruídas e falta de acessibilidade.',
        icone: 'wheelchair-accessibility',
        cor: '#2E9E6B',
        fundo: '#E1F5EC',
        prioridade: 'Moderada',
        corPrioridade: '#6B7280',
    },
    {
        id: 'riscos',
        nome: 'Riscos e segurança',
        descricao: 'Árvores prestes a cair, fios expostos, estruturas danificadas e outros riscos urbanos.',
        icone: 'alert-outline',
        cor: '#E5484D',
        fundo: '#FDE8E8',
        prioridade: 'Pode ser urgente',
        corPrioridade: '#E5484D',
    },
];

export const getCategoria = (id: CategoriaId): Categoria =>
    CATEGORIAS.find((c) => c.id === id) ?? CATEGORIAS[0];