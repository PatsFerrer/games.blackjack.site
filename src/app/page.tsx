import Link from "next/link";
import Image from "next/image";

import { FormLogin, Loading } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 shadow-md rounded-lg">
        <div>
          <Image
            className="mx-auto h-10 w-auto shadow-inherit"
            src="/img/logo-devland_dark.png"
            alt="Logo da DevLand"
            width={500}
            height={500}
            quality={100}
          />
        </div>
        <h2 className="mt-6 text-2xl text-center font-bold text-gray-900">
          Que bom que você voltou!
        </h2>
        <h3 className="mt-2 text-xl text-center font-bold text-gray-900">
          Faça login para começar
        </h3>

        <Suspense fallback={<Loading/>}>
          <FormLogin />
        </Suspense>
        

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui cadastro?{' '}
          <Link href="/cadastro" className="font-medium text-devland hover:text-devland-200">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>

  );
}
