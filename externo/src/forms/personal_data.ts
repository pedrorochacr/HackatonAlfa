import { FormInput } from './types';

export const personalData: FormInput[] = [
  {
    name: 'nomeCompleto',
    element: 'input',
    inputType: 'text',
    label: 'Digite o nome completo do Candidato',
    placeholder: 'Digite seu nome',
  },
  {
    name: 'nomeCompletoMae',
    element: 'input',
    inputType: 'text',
    label: 'Digite o nome completo da mãe',
    placeholder: 'Digite o nome da mãe',
  },
  {
    name: 'nomeCompletoPai',
    element: 'input',
    inputType: 'text',
    label: 'Digite o nome completo do pai',
    placeholder: 'Digite o nome do pai',
  },
  {
    name: 'sexo',
    element: 'select',
    label: 'Sexo',
    placeholder: 'Escolher...',
    options: ['Masculino', 'Feminino', 'Prefiro não informar'],
    inline: true,
  },
  {
    name: 'estadoCivil',
    element: 'select',
    label: 'Estado Civil',
    placeholder: 'Escolher...',
    options: ['Solteiro', 'Casado', 'Outro'],
    inline: true,
  },
  {
    name: 'grauInstrucao',
    element: 'select',
    label: 'Grau de instrução',
    placeholder: 'Escolher...',
    options: ['Ensino Médio', 'Ensino Superior', 'Outro'],
    inline: true,
  },
  {
    name: 'raca',
    element: 'select',
    label: 'Raça/Cor',
    placeholder: 'Escolher...',
    options: ['Branco', 'Preto', 'Outro'],
    inline: true,
  },
];
