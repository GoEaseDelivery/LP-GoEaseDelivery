import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Buttons';

export function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

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
          <input
            id="email"
            name="email"
            type="email"
            required
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
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        {/* <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Entrar
        </button> */}
        <Button className='flex justify-center'>
        <Link
          to="/register"
        >
          Entrar
        </Link>
        </Button>

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