'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalData } from '@/forms/personal_data';
import { birthData } from '@/forms/birth_data';
import { sizes } from '@/forms/sizes';
import { contact } from '@/forms/contact';
import { FormInput } from '@/forms/types';
import { address } from '@/forms/address';
import { registryData } from '@/forms/registryData';
import { otherData } from '@/forms/other';
import { archiveData } from '@/forms/archive';

const schema = z.object({
  // nomeCompleto: z.string().min(3).max(255),
  // nomeCompletoMae: z.string().min(3).max(255),
  // nomeCompletoPai: z.string().min(3).max(255),
  // sexo: z.enum(['Masculino', 'Feminino', 'Outro']),
  // estadoCivil: z.enum(['Casado', 'Solteiro']),
  // grauInstrucao: z.enum(['Ensino Médio', 'Ensino Superior', 'Outro']),
  // raca: z.enum(['Branco', 'Preto', 'Outro']),
  // dataNascimento: z.string(),
  // nacionalidade: z.string().min(3).max(255),
  // paisNascimento: z.string().min(3).max(255),
  // estadoNascimento: z.string().min(3).max(255),
  // cidadeNascimento: z.string().min(3).max(255),
  // numeroBotina: z.number().min(0).max(60),
  // numeroCalca: z.number().min(0).max(60),
  // tamanhoCamisa: z.enum(['P', 'M', 'G', 'GG', 'XG']),
  // telefone1: z.string().min(3).max(255),
  // telefone2: z.string().min(3).max(255),
  // email: z.string().email(),
  // cep: z.string().min(3).max(255),
  // pais: z.string().min(3).max(255),
  // estado: z.string().min(3).max(255),
  // cidade: z.string().min(3).max(255),
  // bairro: z.string().min(3).max(255),
  // tipoLogradouro: z.string().min(3).max(255),
  // enderecoResidencial: z.string().min(3).max(255),
  // numero: z.number().min(3).max(255),
  // complementoEndereco: z.string().min(3).max(255),
  // rg: z.string().min(3).max(255),
  // emissorRg: z.string().min(3).max(255),
  // estadoOrgaoEmissor: z.string().min(3).max(255),
  // cidadeEmissorRg: z.string().min(3).max(255),
  // dataEmissao: z.string(),
  // numeroCpf: z.string().min(3).max(255),
  // numeroPis: z.string().min(3).max(255),
  // funcao: z.string().min(3).max(255),
  // alojado: z.enum(['Sim', 'Não']),
  // pcd: z.enum(['Sim', 'Não']),
  arquivoIdentidade: z.custom<File>(),
  arquivoCpf: z.custom<File>(),
  arquivoCurriculo: z.custom<File>(),
  arquivoCnh: z.custom<File>(),
  arquivoReservista: z.custom<File>(),
  // parenteOuAmigo: z.enum(['Sim', 'Não']),
  // dependentes: z.array(
  //   z.object({
  //     nomeCompleto: z.string().min(3).max(255),
  //     cpf: z.string().min(3).max(255),
  //     sexo: z.enum(['Masculino', 'Feminino', 'Outro']),
  //     dataNascimento: z.string(),
  //     grauParentesco: z.enum(['Filho', 'Esposa', 'Outro']),
  //   })
  // ),
  // termos: z
  //   .boolean()
  //   .refine((v) => v === true, { message: 'Aceite os termos' }),
});

export type FormValues = z.infer<typeof schema>;

export default function SubscriptionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const values = watch();

  async function onSubmit(data: FormValues) {
    console.log(data);

    const formData = new FormData();
    formData.append('arquivoIdentidade', data.arquivoIdentidade[0]);

    await fetch('http://localhost:4000/candidato/cadastrarCandidato', {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      const json = await res.json();
      console.log(json);
    });
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependentes',
  });

  function addDependent() {
    append({
      nomeCompleto: '',
      cpf: '',
      sexo: 'Masculino',
      dataNascimento: '',
      grauParentesco: 'Filho',
    });
  }

  function renderSwitch(field: FormInput) {
    const { element, name, placeholder, inputType, options } = field;

    function renderInputType() {
      switch (inputType) {
        case 'radio': {
          return (
            <div className="flex space-x-2">
              {options?.map((option) => {
                return (
                  <div
                    key={option}
                    className="label flex items-center space-x-1"
                  >
                    <input
                      type="radio"
                      className="radio"
                      value={option}
                      {...register(name)}
                    />
                    <span className="label-text">{option}</span>
                  </div>
                );
              })}
            </div>
          );
        }
        case 'file':
          return (
            <input
              className="file-input w-full"
              type={inputType}
              placeholder={placeholder}
              {...register(name)}
            />
          );
        case 'number':
          return (
            <input
              className="input input-bordered w-full"
              type={inputType}
              placeholder={placeholder}
              {...register(name, { valueAsNumber: true })}
            />
          );
        default:
          return (
            <input
              className="input input-bordered w-full"
              type={inputType}
              placeholder={placeholder}
              {...register(name)}
            />
          );
      }
    }

    switch (element) {
      case 'input':
        return renderInputType();
      case 'select':
        return (
          <select className="select select-bordered w-full" {...register(name)}>
            <option selected>{placeholder}</option>
            {options?.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        );
    }
  }

  return (
    <main className="p-12 space-y-2">
      <p className="prose">
        ATENÇÃO: o preenchimento dessas informações é de suma importância para o
        seu prosseguimento no processo seletivo. Todos os campos são
        OBRIGATÓRIOS, então se atente às informações preenchidas.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <section className="space-y-2">
          <h2 className="text-2xl">Dados Pessoais</h2>
          <hr />
          {personalData.map((field) => {
            const { name, label } = field;
            return (
              <div key={name} className="">
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Dados de Nascimento</h2>
          <hr />
          {birthData.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Tamanhos</h2>
          <hr />
          {sizes.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Contato</h2>
          <hr />
          {contact.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Endereço</h2>
          <hr />
          {address.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Carteira de Identidade, CPF e PIS</h2>
          <hr />
          {registryData.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Outros</h2>
          <hr />
          {otherData.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Anexos</h2>
          <hr />
          {archiveData.map((field) => {
            const { name, label } = field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}

          <p>
            <span className="mr-2">Dependentes</span>
            <button className="btn btn-primary" onClick={addDependent}>
              +
            </button>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <label className="label">
                    <span className="label-text">Dependente {index + 1}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      placeholder="Nome Completo"
                      {...register(
                        `dependentes.${index}.nomeCompleto` as const
                      )}
                    />
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      placeholder="CPF"
                      {...register(`dependentes.${index}.cpf` as const)}
                    />
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      placeholder="Sexo"
                      {...register(`dependentes.${index}.sexo` as const)}
                    />
                    <input
                      className="input input-bordered w-full"
                      type="date"
                      placeholder="Data de Nascimento"
                      {...register(
                        `dependentes.${index}.dataNascimento` as const
                      )}
                    />
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      placeholder="Grau de Parentesco"
                      {...register(
                        `dependentes.${index}.grauParentesco` as const
                      )}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => remove(index)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </p>
        </section>
        <section className="space-y-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            {...register('termos')}
          />
          <span>
            Declaro ciente de que a coleta dos meus dados aqui solicitados é
            essencial para me candidatar às vagas ofertadas pela empresa, sendo
            que autorizo expressamente à ALFA ENGENHARIA, neste ato, a coletar,
            armazenar e utilizar meus dados para esta finalidade. Declaro ciente
            ainda de que a empresa encontra-se adequada à Lei Geral de Proteção
            de Dados, de forma que tive acesso à Política de Privacidade,
            publicada no site.
          </span>
          {errors.termos && (
            <span className="text-xs text-error">
              {errors && errors.termos?.message}
            </span>
          )}
        </section>
        <button type="submit" className="btn btn-primary w-full">
          Enviar
        </button>
      </form>
      <section>
        <h1>Values</h1>
        <pre>
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      </section>
    </main>
  );
}
