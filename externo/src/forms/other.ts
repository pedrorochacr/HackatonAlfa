import { FormInput } from './types';

export const otherData: FormInput[] = [
  {
    name: 'funcao',
    element: 'select',
    label: 'Função',
    placeholder: 'Escolher...',
  },
  {
    name: 'alojado',
    element: 'select',
    label: 'Alojado',
    placeholder: 'Escolher...',
    options: ['Sim', 'Não'],
  },
  {
    name: 'pcd',
    element: 'select',
    label: 'PCD',
    placeholder: 'Escolher...',
    options: ['Sim', 'Não', 'Outro'],
  },
];
