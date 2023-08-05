'use client';

import { useForm } from 'react-hook-form';
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
  nomeCompleto: z.string().min(3).max(255),
  nomeCompletoMae: z.string().min(3).max(255),
  nomeCompletoPai: z.string().min(3).max(255),
  sexo: z.enum(['Masculino', 'Feminino', 'Outro']),
  estadoCivil: z.enum(['Casado', 'Solteiro']),
  grauInstrucao: z.enum(['Ensino Médio', 'Ensino Superior', 'Outro']),
  raca: z.enum(['Branco', 'Preto', 'Outro']),
  dataNascimento: z.date(),
  nacionalidade: z.string().min(3).max(255),
  paisNascimento: z.string().min(3).max(255),
  estadoNascimento: z.string().min(3).max(255),
  cidadeNascimento: z.string().min(3).max(255),
  numeroBotina: z.number().min(0).max(60),
  numeroCalca: z.number().min(0).max(60),
  tamanhoCamisa: z.enum(['P', 'M', 'G', 'GG', 'XG']),
  telefone1: z.string().min(3).max(255),
  telefone2: z.string().min(3).max(255),
  email: z.string().email(),
  rg: z.string().min(3).max(255),
  emissorRg: z.string().min(3).max(255),
  estadoOrgaoEmissor: z.string().min(3).max(255),
  cidadeEmissorRg: z.string().min(3).max(255),
  dataEmissao: z.date(),
  numeroCpf: z.string().min(3).max(255),
  numeroPis: z.string().min(3).max(255),
  funcao: z.string().min(3).max(255),
  alojado: z.enum(['Sim', 'Não']),
  pcd: z.enum(['Sim', 'Não']),
  arquivoIdentidade: z.string().min(3).max(255),
  arquivoCpf: z.string().min(3).max(255),
  arquivoCurriculo: z.string().min(3).max(255),
  arquivoCnh: z.string().min(3).max(255),
  arquivoReservista: z.string().min(3).max(255),
  parenteOuAmigo: z.enum(['Sim', 'Não']),
});

export type FormValues = z.infer<typeof schema>;

export default function SubscriptionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormValues) => console.log(data);

  function renderSwitch(field: FormInput) {
    const { element, name, placeholder, inputType, options } = field;

    function renderInputType() {
      switch (inputType) {
        case 'text' || 'number' || 'email' || 'password' || 'tel' || 'date':
          return (
            <input
              className="input input-bordered w-full"
              type={inputType}
              placeholder={placeholder}
              {...register(name)}
            />
          );
        case 'radio': {
          return (
            <div className="flex space-x-2">
              {options?.map((option) => {
                return (
                  <label key={option} className="label flex items-center">
                    <input
                      type="radio"
                      className="radio"
                      value={option}
                      {...register(name)}
                    />
                    <span className="label-text">{option}</span>
                  </label>
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
      }
    }

    switch (element) {
      case 'input':
        return renderInputType();
      case 'select':
        return (
          <select className="select select-bordered w-full">
            <option>{placeholder}</option>
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
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Dados de Nascimento</h2>
          <hr />
          {birthData.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Tamanhos</h2>
          <hr />
          {sizes.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Contato</h2>
          <hr />
          {contact.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Endereço</h2>
          <hr />
          {address.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Carteira de Identidade, CPF e PIS</h2>
          <hr />
          {registryData.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Outros</h2>
          <hr />
          {otherData.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl">Arquivos</h2>
          <hr />
          {archiveData.map((field) => {
            const { name, label, placeholder, element, inputType, options } =
              field;
            return (
              <div key={name}>
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {renderSwitch(field)}
              </div>
            );
          })}
        </section>
      </form>
    </main>
  );
}
