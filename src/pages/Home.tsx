
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  Truck,
  BarChart3,
  Smartphone,
} from "lucide-react";
import { Button } from "../components/Buttons";
import { PricingCard } from '../components/PricingCard';
import { FeatureCard } from '../components/FeatureCard';
import { TestimonialCard } from '../components/TestimonialCard';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Simplifique seu delivery com{" "}
                <span className="text-blue-600">GOEaseDelivery</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Gerencie pedidos, entregas e clientes em uma única plataforma.
                Aumente suas vendas e satisfação dos clientes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button>
                  <Link to="/register">Começar Agora</Link>
                </Button>

                <Button>
                  <a href="#pricing">Ver Planos</a>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3"
                alt="Delivery"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recursos que impulsionam seu negócio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Gestão de Entregas"
              description="Acompanhe suas entregas em tempo real e otimize rotas"
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Análise de Dados"
              description="Relatórios detalhados para tomar melhores decisões"
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6" />}
              title="App Mobile"
              description="Aplicativo próprio para seus clientes fazerem pedidos"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Planos que cabem no seu bolso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Básico"
              price="99"
              features={[
                "Até 100 pedidos/mês",
                "App personalizado",
                "Suporte por email",
              ]}
            />
            <PricingCard
              title="Profissional"
              price="199"
              popular={true}
              features={[
                "Pedidos ilimitados",
                "App personalizado",
                "Suporte prioritário",
                "Análise de dados",
                "Múltiplos estabelecimentos",
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="399"
              features={[
                "Tudo do Profissional",
                "API personalizada",
                "Suporte 24/7",
                "Treinamento da equipe",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="João Silva"
              role="Proprietário da Pizzaria do João"
              content="Desde que começamos a usar o GOEaseDelivery, nossas entregas ficaram muito mais organizadas e os clientes mais satisfeitos."
            />
            <TestimonialCard
              name="Maria Santos"
              role="Gerente do Restaurante Sabor & Cia"
              content="O aplicativo é muito fácil de usar e o suporte é excelente. Recomendo para todos os restaurantes!"
            />
            <TestimonialCard
              name="Pedro Oliveira"
              role="Dono do Food Truck Gourmet"
              content="Com o GOEaseDelivery, conseguimos aumentar nossas vendas em 40% no primeiro mês. Incrível!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Pronto para revolucionar seu delivery?
          </h2>
          <Button className="text-blue-600 bg-white hover:bg-gray-50 active:bg-gray-300  self-center">
            <Link to="/register">Começar Gratuitamente</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};


