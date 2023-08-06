'use client'

import { signOut } from "next-auth/react";

function signOutAndRedirect() {
  signOut({ callbackUrl: '/' });
}

export function LogoutButton() {
  return (
    <button className='btn btn-neutral' onClick={signOutAndRedirect}>
      Desconectar
    </button>
  );
};