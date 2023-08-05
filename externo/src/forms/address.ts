import { FormInput } from './types';

export const address: FormInput[] = [
  {
    name: 'cep',
    element: 'input',
    inputType: 'text',
    label: 'CEP',
    placeholder: 'Ex: 30690500',
  },
  {
    name: 'pais',
    element: 'input',
    inputType: 'text',
    label: 'País',
    placeholder: 'Brasil',
  },
  {
    name: 'estado',
    element: 'input',
    inputType: 'text',
    label: 'Estado',
    placeholder: 'Minas Gerais',
  },
  {
    name: 'cidade',
    element: 'input',
    inputType: 'text',
    label: 'Cidade',
    placeholder: 'Belo Horizonte',
  },
  {
    name: 'bairro',
    element: 'input',
    inputType: 'text',
    label: 'Bairro',
    placeholder: 'Barreiro',
  },
  {
    name: 'tipoLogradouro',
    element: 'select',
    label: 'Tipo de Logradouro',
    placeholder: 'Escolher...',
    options: ['Rua', 'Avenida', 'Outro'],
  },
  {
    name: 'enderecoResidencial',
    element: 'input',
    inputType: 'text',
    label: 'Endereco Residencial',
    placeholder: 'Ex: rua 0',
  },
  {
    name: 'numero',
    element: 'input',
    inputType: 'number',
    label: 'Número',
    placeholder: '60',
  },
  {
    name: 'complementoEndereco',
    element: 'input',
    inputType: 'text',
    label: 'Complemento Endereco',
    placeholder: 'Casa, apartamento, etc',
  },
];
