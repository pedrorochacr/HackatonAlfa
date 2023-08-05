import { FormInput } from './types';

export const birthData: FormInput[] = [
  {
    name: 'dataNascimento',
    element: 'input',
    inputType: 'date',
    label: 'Data de nascimento',
    placeholder: '',
  },
  {
    name: 'nacionalidade',
    element: 'select',
    label: 'Nacionalidade',
    placeholder: 'Escolher...',
    options: ['Brasileiro', 'Estrangeiro'],
  },
  {
    name: 'paisNascimento',
    element: 'select',
    label: 'País Nascimento',
    placeholder: 'Escolher...',
    options: ['Brasil', 'States'],
  },
  {
    name: 'estadoNascimento',
    element: 'input',
    inputType: 'text',
    label: 'Estado de nascimento',
    placeholder: '',
    options: ['Minas Gerais', 'São Paulo'],
  },
  {
    name: 'cidadeNascimento',
    element: 'input',
    inputType: 'text',
    label: 'Cidade de nascimento',
    placeholder: '',
    options: ['Belo Horizonte', 'São Paulo'],
  },
];
