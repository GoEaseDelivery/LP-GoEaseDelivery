import { Link } from "react-router-dom";
import { Button } from "./Buttons";
import { Clock } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  classname?: string;
  popular?: boolean;
  width?: number;
}

export function PricingCard({
  title,
  price,
  features,
  popular,
}: PricingCardProps) {
  return (
    <div
      className={
          `flex flex-col justify-between bg-white rounded-lg shadow-md p-8 ${
            popular ? "ring-2 ring-blue-600" : ""
          }`
      }
    >
      {popular && (
        <span className=" self-start bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium ">
          Mais Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{title}</h3>
      <p className="mt-4">
        <span className="text-4xl font-bold text-gray-900">R${price}</span>
        <span className="text-gray-600">/mês</span>
      </p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-8 block w-full text-center px-6 py-3 rounded-full font-medium">
        <Link to="/register">Começar Agora</Link>
      </Button>
    </div>
  );
}
