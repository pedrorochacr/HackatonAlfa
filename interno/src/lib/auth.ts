import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Objeto de configuração do next-auth
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    // Provedor do tipo Credentials envolve email e senha
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        senha: { label: 'Senha', type: 'password' },
      },
      // Função chamada quando o metódo signIn do next-auth é chamada
      async authorize(credentials) {
        if (credentials == null) return;
        try {
          const user = await signIn({
            email: credentials.email,
            senha: credentials.senha,
          });
          // O retorno está disponível na sessão
          return user;
        } catch (error) {
          throw new Error('Algo de errado aconteceu na autenticação');
        }
      },
    }),
  ],
  callbacks: {
    // Atualiza o token
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.nome = user.nome;
        token.cargo = user.cargo;
        token.email = user.email;
      }
      return token;
    },
    // Atualiza a sessão. Acessável via useSession
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.nome = token.nome as string;
        session.user.cargo = token.cargo as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

// Função que faz a requisição para o servidor local, validando a entrada
export async function signIn(data: { email: string; senha: string }) {
  const endpoint = 'http://localhost:4000/auth/login';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (res.ok) {
    return json;
  } else {
    const error = json;
    return Promise.reject(error);
  }
}

// Função de cadastro para o servidor local
export async function signUp(data: {
  email: string;
  senha: string;
  cargo: string;
  nome: string;
}) {
  const endpoint = 'http://localhost:4000/auth/register';
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.status;
}
