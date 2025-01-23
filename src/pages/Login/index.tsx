import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthLayout } from '../../components/AuthLayout';
import { useAuthStore } from '../../store/auth';
import { Button } from '../../components/Buttons';
import { Input } from '../../components/Dashboard/ui/Input';
import { useLoginController } from './useLoginController';



export function Login() {

    const { handleSubmit, register, errors, isPending } = useLoginController();


  // const onSubmit = async (data: LoginForm) => {
  //   const success = await login(data.email, data.password);
  //   if (success) {
  //     navigate("/dashboard");
  //   } else {
  //     setError("Credenciais inválidas");
  //   }
  // };

  return (
    <AuthLayout title="Entre na sua conta">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para a página inicial
      </Link>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            // type="email"
            required
            {...register("username", { required: "E-mail é obrigatório" })}
            error={errors.username?.message}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Senha é obrigatória" })}
            error={errors.password?.message}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <Button className=" w-full" type="submit" isLoading={isPending}>
            Entrar
          </Button>
        </div>

        <div className="text-sm text-center">
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Não tem uma conta? Registre-se
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
