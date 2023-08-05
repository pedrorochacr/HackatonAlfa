import { FormInput } from './types';

export const sizes: FormInput[] = [
  {
    name: 'numeroBotina',
    element: 'input',
    inputType: 'number',
    label: 'Numero de botina',
    placeholder: '22',
  },
  {
    name: 'numeroCalca',
    element: 'input',
    inputType: 'number',
    label: 'Numero de calça',
    placeholder: '38',
  },
  {
    name: 'tamanhoCamisa',
    element: 'select',
    label: 'Tamanho da camisa',
    placeholder: 'Escolher...',
    options: ['P', 'M', 'G', 'GG', 'XG'],
  },
];
