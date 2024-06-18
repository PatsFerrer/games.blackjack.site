export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 shadow-md rounded-lg">
        <div className="">
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

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui cadastro?{' '}
          <a href="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}