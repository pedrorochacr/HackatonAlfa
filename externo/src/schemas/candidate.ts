import { ZodType, z } from 'zod';

export const candidateSchema = z.object({
  nomeCompleto: z.string().min(3, 'Preencha o seu nome').max(255),
  nomeCompletoMae: z.string().min(3, 'Preencha o nome da sua mãe').max(255),
  nomeCompletoPai: z.string().min(3, 'Preencha o nome do seu pai').max(255),
  sexo: z.string().nonempty('Selecione o sexo'),
  estadoCivil: z.string().nonempty('Selecione o estado civil'),
  grauInstrucao: z.string().nonempty('Selecione o grau de instrução'),
  raca: z.string().nonempty('Selecione a raça'),
  dataNascimento: z.string().min(3, 'Preencha a data'),
  nacionalidade: z.string().min(3, 'Preencha sua nacionalidade').max(255),
  paisNascimento: z.string().min(3, 'Preencha o país de nascimento').max(255),
  estadoNascimento: z.string().optional(),
  cidadeNascimento: z.string().optional(),
  numeroBotina: z.number().min(0).max(50),
  numeroCalca: z.number().min(0).max(80),
  tamanhoCamisa: z.string().nonempty('Selecione o tamanho da camisa').max(255),
  telefone1: z
    .string()
    .regex(
      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
      'Formato incorreto'
    )
    .min(3)
    .max(20),
  telefone2: z.string().optional(),
  email: z.string().email('Email inválido'),
  cep: z
    .string()
    .min(8)
    .max(8)
    .regex(/^\d{5}-?\d{3}$/, 'Formato incorreto'),
  pais: z.string().optional(),
  estado: z.string().min(3, 'Selecione o estado'),
  cidade: z.string().min(3, 'Selecione a cidade'),
  bairro: z.string().min(3, 'Selecione o bairro'),
  tipoLogradouro: z.string().nonempty('Selecione o tipo de logradouro'),
  enderecoResidencial: z.string().min(3, 'Preencha o endereço').max(255),
  numero: z.number().nonnegative('Preencha o número'),
  complementoEndereco: z.string().min(3, 'Preencha o complemento').max(255),
  rg: z.string().min(3).max(255),
  emissorRg: z.string().optional(),
  estadoOrgaoEmissor: z.string().min(3, 'Selecione o estado'),
  cidadeEmissorRg: z.string().min(3, 'Selecione a cidade'),
  dataEmissao: z.string().optional(),
  numeroCpf: z.string().min(11, 'Preencha o CPF').max(11),
  numeroPis: z.string().min(11, 'Preencha o numero PIS').max(11),
  funcao: z.string().min(3, 'Selecione a função'),
  alojado: z.string().min(1, 'Selecione se é alojado'),
  pcd: z.string().min(1, 'Selecione se é PCD'),
  arquivoIdentidade: z.any() as ZodType<File>,
  arquivoCpf: z.any() as ZodType<File>,
  arquivoCurriculo: z.any() as ZodType<File>,
  arquivoCnh: (z.any() as ZodType<File>).optional(),
  arquivoReservista: (z.any() as ZodType<File>).optional(),
  parenteOuAmigo: z.string().min(1, 'Selecione se é parente ou amigo'),
  dependentes: z.array(
    z.object({
      nomeCompleto: z.string().min(3, 'Preencha o nome').max(255),
      cpf: z.string().min(11, 'Preencha o cpf').max(11),
      sexo: z.string().min(3, 'Selecione o sexo'),
      dataNascimento: z.string().min(3, 'Preencha a data'),
      grauParentesco: z.string().min(3, 'Selecione o grau de parentesco'),
    })
  ),
  termos: z
    .boolean()
    .refine((v) => v === true, { message: 'Aceite os termos' }),
  conhecidoNome: z.string().optional(),
  conhecidoCidade: z.string().optional(),
  conhecidoFuncao: z.string().optional(),
});

export type CandidateForm = z.infer<typeof candidateSchema>;
