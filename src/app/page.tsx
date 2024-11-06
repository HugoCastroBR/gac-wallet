'use client'
import RegisterPage from "@/components/pages/RegisterPage";
import { redirect } from "next/navigation";

export default function Home() {

  const ifLoggedRedirect = () => {
    const isLogged = localStorage.getItem('isLogged')
    if (isLogged === 'true') {
      redirect('/dashboard')
    }else{
      redirect('/login')
    }
  }

  ifLoggedRedirect()

  return (
    <RegisterPage />
  );
}
