'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CandidateForm, candidateSchema } from '@/schemas/candidate';
import { FormInput } from '@/forms/types';
import { personalData } from '@/forms/personal_data';
import { birthData } from '@/forms/birth_data';
import { sizes } from '@/forms/sizes';
import { contact } from '@/forms/contact';
import { address } from '@/forms/address';
import { registryData } from '@/forms/registryData';
import { otherData } from '@/forms/other';
import { archiveData } from '@/forms/archive';
import { ResponseCandidato } from '@/types/responseCandidato';
import { Function, ResponseError } from '@/types/generic';

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
  const [similaridades, setSimilaridades] = useState<number[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [finished, setFinished] = useState(false);
  const router = useRouter();
  function endRegistration(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push('/fechamento');
  }

  function addDependent(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    append({
      nomeCompleto: '',
      cpf: '',
      sexo: 'Escolher...',
      dataNascimento: '',
      grauParentesco: 'Escolher...',
    });
  }

  // Monta as seções, cada uma com seu título e seus campos do formulário
  const sections = [
    { title: 'Dados Pessoais', fields: personalData },
    { title: 'Dados de Nascimento', fields: birthData },
    { title: 'Tamanhos', fields: sizes },
    { title: 'Contato', fields: contact },
    { title: 'Endereço', fields: address },
    { title: 'Carteira de Identidade, CPF e PIS', fields: registryData },
    { title: 'Outros', fields: otherData },
    { title: 'Anexos', fields: archiveData },
  ];

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
      const json = (await res.json()) as ResponseCandidato;
      setSimilaridades([
        json.similaridadeIdentidade,
        json.similaridadeCnh,
        json.similaridadeReservista,
      ]);
      setFinished(true);
    } else {
      const json = (await res.json()) as ResponseError;
      alert(json.error);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependentes',
  });

  function renderInput(field: FormInput) {
    const { element, name, placeholder, inputType, options } = field;

    // Renderiza um estilo para cada tipo de input
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

    // Renderiza um input ou select
    switch (element) {
      case 'input':
        return renderInputType();
      case 'select':
        return (
          <select
            defaultValue={''}
            className="select select-bordered w-full"
            {...register(name)}
          >
            <option value="" disabled>
              {placeholder}
            </option>
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
    <>
      <main className="p-12 space-y-2">
        <p className="prose text-white">
          ATENÇÃO: o preenchimento dessas informações é de suma importância para
          o seu prosseguimento no processo seletivo. Todos os campos são
          OBRIGATÓRIOS, então se atente às informações preenchidas.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {sections.map((section) => {
            return (
              <section key={section.title} className="space-y-2">
                <h2 className="text-2xl">{section.title}</h2>
                <hr />
                {section.fields.map((field) => {
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
            );
          })}

          <section className="space-y-2">
            {/* Observa o radio button do amigo ou parente */}
            {watchParenteOuAmigo === 'Sim' && (
              <>
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
              </>
            )}
          </section>

          {/* Dependentes */}
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
                    <select
                      className="select select-bordered w-full"
                      {...register(`dependentes.${index}.sexo` as const)}
                    >
                      <option disabled selected>
                        Sexo
                      </option>
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
                      <option disabled selected>
                        Grau de parentesco
                      </option>
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

          <section className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register('termos')}
              />
              <p>
                Declaro ciente de que a coleta dos meus dados aqui solicitados é
                essencial para me candidatar às vagas ofertadas pela empresa,
                sendo que autorizo expressamente à ALFA ENGENHARIA, neste ato, a
                coletar, armazenar e utilizar meus dados para esta finalidade.
                Declaro ciente ainda de que a empresa encontra-se adequada à Lei
                Geral de Proteção de Dados, de forma que tive acesso à Política
                de Privacidade, publicada no site.
              </p>
            </div>
            {errors.termos && (
              <span className="text-xs text-error w-full">
                {errors && errors.termos?.message}
              </span>
            )}
          </section>
          {!finished ? (
            <button type="submit" className="btn btn-primary w-full">
              Enviar
            </button>
          ) : (
            <button
              onClick={endRegistration}
              className="btn btn-primary w-full"
            >
              Encerrar
            </button>
          )}
        </form>
        {finished && (
          <button
            className="btn w-full"
            onClick={() => dialogRef.current?.showModal()}
          >
            Analise dos documentos
          </button>
        )}

        <dialog ref={dialogRef} id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">
              Resultados das análises dos documentos
            </h3>
            <h4 className="mb-4">
              Porcentagem de similaridade em relação ao modelo utilizando OCR:
            </h4>
            {similaridades && similaridades.length > 0 && (
              <>
                <p>Identidade: {similaridades[0].toFixed(2)}%</p>
                <p>Cnh: {similaridades[1].toFixed(2)}%</p>
                <p>Reservista: {similaridades[2].toFixed(2)}%</p>
              </>
            )}
            <div className="modal-action">
              <button className="btn">Fechar</button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  );
}
