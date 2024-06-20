import Link from "next/link";
import { FormLogin } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 shadow-md rounded-lg">
        <div>
          <img
            className="mx-auto h-10 w-auto "
            src="/img/esx-logo.png"
            alt="Your Company"
          />
        </div>
        <h2 className="mt-6 text-2xl text-center font-bold text-gray-900">
          Que bom que você voltou!
        </h2>
        <h3 className="mt-2 text-xl text-center font-bold text-gray-900">
          Faça login para começar.
        </h3>

        <FormLogin />

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui cadastro?{' '}
          <Link href="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>

  );
}
