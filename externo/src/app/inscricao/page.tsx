'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalData } from '@/forms/personal_data';
import { birthData } from '@/forms/birth_data';
import { sizes } from '@/forms/sizes';
import { contact } from '@/forms/contact';
import { FormInput } from '@/forms/types';
import { address } from '@/forms/address';
import { registryData } from '@/forms/registryData';
import { otherData } from '@/forms/other';
import { archiveData } from '@/forms/archive';
import { useEffect, useState } from 'react';
import { CandidateForm, candidateSchema } from '../../../schemas/candidate';
import { useRouter } from 'next/navigation';

type Function = {
  id: number;
  descricao: string;
  codigo: string;
  cbo: string;
};

export default function SubscriptionPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<CandidateForm>({
    resolver: zodResolver(candidateSchema),
  });
  const [functions, setFunctions] = useState<Function[]>([]);
  const watchParenteOuAmigo = watch('parenteOuAmigo');
  const [similaridades, setSimilaridades] = useState<string[]>([50, 10, 20]);
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:4000/candidato/listarFuncoes')
      .then(async (res) => {
        const json = await res.json();
        setFunctions(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function onSubmit(data: CandidateForm) {
    const files = [
      'arquivoIdentidade',
      'arquivoCpf',
      'arquivoCurriculo',
      'arquivoCnh',
      'arquivoReservista',
    ];
    const formData = new FormData();
    for (const key in data) {
      if (!files.includes(key)) {
        //@ts-ignore
        const value = data[key];
        if (value.length > 0) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    }
    // @ts-ignore
    formData.append('arquivoIdentidade', data.arquivoIdentidade[0]);
    // @ts-ignore
    formData.append('arquivoCpf', data.arquivoCpf[0]);
    // @ts-ignore
    formData.append('arquivoCurriculo', data.arquivoCurriculo[0]);
    // @ts-ignore
    formData.append('arquivoCnh', data.arquivoCnh[0]);
    // @ts-ignore
    formData.append('arquivoReservista', data.arquivoReservista[0]);

    const res = await fetch(
      'http://localhost:4000/candidato/cadastrarCandidato',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (res.ok) {
      alert('Candidato cadastrado com sucesso');
      const json = await res.json();
      setSimilaridades([
        json.similaridadeIdentidade,
        json.similaridadeCnh,
        json.similaridadeReservista,
      ]);

      setFinished(true);
    } else {
      const json = await res.json();
      alert(json.error);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependentes',
  });

  function addDependent() {
    append({
      nomeCompleto: '',
      cpf: '',
      sexo: 'Escolher...',
      dataNascimento: '',
      grauParentesco: 'Escolher...',
    });
  }

  function renderInput(field: FormInput) {
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
            {name === 'funcao' &&
              functions.map((option) => {
                return (
                  <option key={option.id} value={option.descricao}>
                    {option.descricao}
                  </option>
                );
              })}
          </select>
        );
    }
  }

  return (
    <main className="p-12 space-y-2">
      <p className="prose text-white">
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
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
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
                {renderInput(field)}
                {errors[name] && (
                  <span className="text-xs text-error">
                    {errors && errors[name]?.message}
                  </span>
                )}
              </div>
            );
          })}
          {watchParenteOuAmigo === 'Sim' && (
            <div>
              <label className="label">
                <span className="label-text">Nome do conhecido</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Nome"
                {...register('conhecidoNome')}
              />
              {errors['conhecidoNome'] && (
                <span className="text-xs text-error">
                  {errors && errors['conhecidoNome']?.message}
                </span>
              )}
              <label className="label">
                <span className="label-text">Cidade do conhecido</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Cidade"
                {...register('conhecidoCidade')}
              />
              {errors['conhecidoCidade'] && (
                <span className="text-xs text-error">
                  {errors && errors['conhecidoCidade']?.message}
                </span>
              )}
              <label className="label">
                <span className="label-text">Função do conhecido</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('conhecidoFuncao')}
              >
                <option selected>Escolha...</option>
                {functions.map((option) => {
                  return (
                    <option key={option.id} value={option.descricao}>
                      {option.descricao}
                    </option>
                  );
                })}
              </select>
              {errors['conhecidoNome'] && (
                <span className="text-xs text-error">
                  {errors && errors['conhecidoNome']?.message}
                </span>
              )}
            </div>
          )}
        </section>
        {}
        <section className="flex flex-col">
          <div className="flex flex-row">
            <p className="mr-2">Dependentes</p>
            <button className="btn btn-secondary" onClick={addDependent}>
              +
            </button>
          </div>

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
                    {...register(`dependentes.${index}.nomeCompleto` as const)}
                  />
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="CPF"
                    {...register(`dependentes.${index}.cpf` as const)}
                  />
                  <select
                    className="select select-bordered w-full"
                    {...register(`dependentes.${index}.sexo` as const)}
                  >
                    <option selected>Escolher...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>

                  <input
                    className="input input-bordered w-full"
                    type="date"
                    placeholder="Data de Nascimento"
                    {...register(
                      `dependentes.${index}.dataNascimento` as const
                    )}
                  />
                  <select
                    className="select select-bordered w-full"
                    {...register(
                      `dependentes.${index}.grauParentesco` as const
                    )}
                  >
                    <option selected>Escolher...</option>
                    <option value="Filho">Filho</option>
                    <option value="Conjugue">Conjugue</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={() => remove(index)}
                  >
                    Remover
                  </button>
                </div>
                {errors.dependentes && (
                  <span className="text-xs text-error w-full">
                    Um ou mais dependentes não foram preenchidos corretamente
                  </span>
                )}
              </div>
            );
          })}
        </section>
        <section className="flex flex-row gap-2 justfify-center flex-wrap">
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
            <span className="text-xs text-error w-full">
              {errors && errors.termos?.message}
            </span>
          )}
        </section>
        {!finished && (
          <button type="submit" className="btn btn-primary w-full">
            Enviar
          </button>
        )}
      </form>
      {finished && (
        <button
          className="btn w-full"
          onClick={() => window.my_modal_1.showModal()}
        >
          Analise dos documentos
        </button>
      )}

      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">
            Resultados das análises dos documentos
          </h3>
          <h4 className='mb-4'>Porcentagem de similaridade em relação ao modelo utilizando OCR:</h4>
          {similaridades && similaridades.length > 0 && (
            <>
              <p>Identidade: {similaridades[0]}%</p>
              <p>Cnh: {similaridades[1]}%</p>
              <p>Reservista: {similaridades[2]}%</p>
            </>
          )}
          <div className="modal-action">
            <button className="btn">Fechar</button>
          </div>
        </form>
      </dialog>
    </main>
  );
}
