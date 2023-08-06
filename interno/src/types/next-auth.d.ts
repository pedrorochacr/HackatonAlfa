import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      nome: string;
      cargo: string;
      email: string;
    } & DefaultSession['user'];
  }

  interface User {
    jwt: string
    username: string
    nome: string
    cargo: string
  }
}