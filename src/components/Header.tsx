import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from './Buttons';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              GOEaseDelivery
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6"></nav>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 transition-all"
              >
                Entrar
              </Link>
              <Button>
                <Link
                  to="/register"
                  // className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
                >
                  Começar Agora
                </Link>
              </Button>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-4 p-4">
            <Link to="/#features" className="text-gray-600">
              Recursos
            </Link>
            <Link to="/#pricing" className="text-gray-600">
              Planos
            </Link>
            <Link to="/#testimonials" className="text-gray-600">
              Depoimentos
            </Link>
            <Link to="/login" className="text-blue-600">
              Entrar
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-center"
            >
              Começar Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
