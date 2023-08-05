'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  nomeCompleto: z.string().min(3).max(255),
  nomeCompletoMae: z.string().min(3).max(255),
  nomeCompletoPai: z.string().min(3).max(255),
});

type FormValues = z.infer<typeof schema>;

export default function SubscriptionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <main className="p-12 space-y-2">
      <p className="prose">
        ATENÇÃO: o preenchimento dessas informações é de suma importância para o
        seu prosseguimento no processo seletivo. Todos os campos são
        OBRIGATÓRIOS, então se atente às informações preenchidas.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <section>
          <h2 className="text-2xl">Dados Pessoais</h2>
          <hr />
          <input {...register('nomeCompleto')} />
          <p>{errors.nomeCompleto?.message}</p>
        </section>
      </form>
    </main>
  );
}
