import { FormInput } from './types';

export const archiveData: FormInput[] = [
  {
    name: 'arquivoIdentidade',
    element: 'input',
    inputType: 'file',
    label: 'Arquivo de identidade',
    placeholder: 'Escolher...',
  },
  {
    name: 'arquivoCpf',
    element: 'input',
    inputType: 'file',
    label: 'Arquivo de Cpf',
    placeholder: 'Escolher...',
  },
  {
    name: 'arquivoCurriculo',
    element: 'input',
    inputType: 'file',
    label: 'Arquivo de Curriculo',
    placeholder: 'Escolher...',
  },
  {
    name: 'arquivoCnh',
    element: 'input',
    inputType: 'file',
    label: 'Arquivo de CNH',
    placeholder: 'Escolher...',
  },
  {
    name: 'arquivoReservista',
    element: 'input',
    inputType: 'file',
    label: 'Arquivo de Reservista',
    placeholder: 'Escolher...',
  },
  {
    name: 'parenteOuAmigo',
    element: 'input',
    inputType: 'radio',
    label: 'Parente ou amigo que trabalha na Alfa',
    options: ['Sim', 'Não'],
  },
];
