import FormCadastro from "./components/FormCadastro";


export default async function Cadastro() { //coloquei async
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FormCadastro />
    </div>
  );
}