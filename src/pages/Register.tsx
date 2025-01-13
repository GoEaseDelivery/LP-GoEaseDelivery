import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { ArrowLeft } from 'lucide-react';

interface RegisterData {
  restaurantName: string;
  address: string;
  ownerName: string;
  email: string;
  password: string;
  document: string;
}

export function Register() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState<RegisterData>({
    restaurantName: '',
    address: '',
    ownerName: '',
    email: '',
    password: '',
    document: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setDirection('forward');
      setStep(step + 1);
    } else {
      // TODO: Implement registration logic
      console.log(formData);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection('backward');
      setStep(step - 1);
    }
  };

  const goToStep = (newStep: number) => {
    if (newStep < step) {
      setDirection('backward');
    } else {
      setDirection('forward');
    }
    setStep(newStep);
  };

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.restaurantName.trim() !== '' && formData.address.trim() !== '';
      case 2:
        return formData.ownerName.trim() !== '' && formData.document.trim() !== '';
      case 3:
        return formData.email.trim() !== '' && formData.password.trim() !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    const baseClasses = "transition-all duration-500 transform";
    const forwardClasses = direction === 'forward' 
      ? "translate-x-0 opacity-100" 
      : "-translate-x-full opacity-0";
    const backwardClasses = direction === 'backward'
      ? "translate-x-0 opacity-100"
      : "translate-x-full opacity-0";
    
    const animationClasses = `${baseClasses} ${direction === 'forward' ? forwardClasses : backwardClasses}`;

    switch (step) {
      case 1:
        return (
          <div className={animationClasses}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Restaurante</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                  Nome do Restaurante
                </label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={animationClasses}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                  Nome do Proprietário
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                  CNPJ / CPF
                </label>
                <input
                  id="document"
                  name="document"
                  type="text"
                  required
                  value={formData.document}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={animationClasses}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Credenciais de Acesso</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout title="Registre seu restaurante">
      {step === 1 ? (
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para a página inicial
        </Link>
      ) : (
        <button
          onClick={goBack}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para a etapa anterior
        </button>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => stepNumber < step && goToStep(stepNumber)}
                  className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white scale-110 cursor-pointer"
                      : "bg-gray-200 text-gray-600"
                  } ${stepNumber < step ? "hover:bg-blue-700" : ""}`}
                >
                  {isStepComplete(stepNumber) && stepNumber < step && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Editar
                    </span>
                  )}
                  {stepNumber}
                </button>
                <span
                  className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                    step >= stepNumber ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {stepNumber === 1
                    ? "Restaurante"
                    : stepNumber === 2
                    ? "Pessoal"
                    : "Acesso"}
                </span>
              </div>
              {stepNumber < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                    step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {renderStep()}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            {step < 3 ? "Próxima Etapa" : "Registrar"}
          </button>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Já tem uma conta? Entre aqui
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}