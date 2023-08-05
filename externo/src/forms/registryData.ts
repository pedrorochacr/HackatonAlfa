import { FormInput } from './types';

export const registryData: FormInput[] = [
  {
    name: 'rg',
    element: 'input',
    inputType: 'text',
    label: 'Numero da carteira de identidade',
    placeholder: 'Ex: 123456789',
  },
  {
    name: 'emissorRg',
    element: 'input',
    inputType: 'text',
    label: 'Emissor do RG',
    placeholder: 'SSP, SJC, etc',
  },
  {
    name: 'estadoOrgaoEmissor',
    element: 'select',
    label: 'Estado do orgão emissor',
    placeholder: 'Escolher...',
    options: ['MG', 'SP', 'RJ', 'Outro'],
  },
  {
    name: 'cidadeEmissorRg',
    element: 'input',
    inputType: 'text',
    label: 'Cidade do orgão emissor',
    placeholder: 'Ex: Belo Horizonte',
  },
  {
    name: 'dataEmissao',
    element: 'input',
    inputType: 'date',
    label: 'Cidade do orgão emissor',
    placeholder: 'Ex: Belo Horizonte',
  },
  {
    name: 'numeroCpf',
    element: 'input',
    inputType: 'text',
    label: 'Numero do CPF',
    placeholder: 'Ex: Belo Horizonte',
  },
  {
    name: 'numeroPis',
    element: 'input',
    inputType: 'text',
    label: 'Numero do PIS',
    placeholder: 'Ex: Belo Horizonte',
  },
];
