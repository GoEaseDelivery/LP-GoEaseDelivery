import React, { useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatsCard } from '../components/Dashboard/dashboard/StatsCard';
import { Card } from '../components/Dashboard/ui/Card';
import { Button } from '../components/Dashboard/ui/Button';
// import { Card } from "@/components/Dashboard/ui/Card";
// import { StatsCard } from "@/components/dashboard/StatsCard";
// import { Button } from "@/components/ui/Button";
// import { TopProducts } from "@/components/dashboard/TopProducts";

const mockData = {
  stats: {
    customers: 1234,
    orders: 789,
    revenue: 45678.9, // Faturamento total
    pendingOrders: 12,
    revenueChange: 15.7, // Aumento de 15,7% em relação ao período anterior
  },
  salesData: [
    {
      mes: "2025-1",
      total_vendas_mes: 30000,
      dias: [
        { dia: 1, vendas: 0 }, // Quarta-feira
        { dia: 2, vendas: 200 }, // Quinta-feira
        { dia: 3, vendas: 1200 }, // Sexta-feira
        { dia: 4, vendas: 1500 }, // Sábado
        { dia: 5, vendas: 1400 }, // Domingo
        { dia: 6, vendas: 1000 }, // Segunda-feira
        { dia: 7, vendas: 1100 }, // Terça-feira
        { dia: 8, vendas: 950 }, // Quarta-feira
        { dia: 9, vendas: 1300 }, // Quinta-feira
        { dia: 10, vendas: 1600 }, // Sexta-feira
        { dia: 11, vendas: 1700 }, // Sábado
        { dia: 12, vendas: 1800 }, // Domingo
        { dia: 13, vendas: 1100 }, // Segunda-feira
        { dia: 14, vendas: 1200 }, // Terça-feira
        { dia: 15, vendas: 1000 }, // Quarta-feira
        { dia: 16, vendas: 1400 }, // Quinta-feira
        { dia: 17, vendas: 1500 }, // Sexta-feira
        { dia: 18, vendas: 1900 }, // Sábado
        { dia: 19, vendas: 2000 }, // Domingo
        { dia: 20, vendas: 1300 }, // Segunda-feira
        { dia: 21, vendas: 1400 }, // Terça-feira
        { dia: 22, vendas: 1100 }, // Quarta-feira
        { dia: 23, vendas: 1600 }, // Quinta-feira
        { dia: 24, vendas: 1700 }, // Sexta-feira
        { dia: 25, vendas: 2100 }, // Sábado
        { dia: 26, vendas: 2200 }, // Domingo
        { dia: 27, vendas: 1500 }, // Segunda-feira
        { dia: 28, vendas: 1600 }, // Terça-feira
        { dia: 29, vendas: 1200 }, // Quarta-feira
        { dia: 30, vendas: 1800 }, // Quinta-feira
        { dia: 31, vendas: 1900 }, // Sexta-feira
      ],
    },
    {
      mes: "2025-2",
      total_vendas_mes: 25000,
      dias: [
        { dia: 1, vendas: 700 }, // Sábado
        { dia: 2, vendas: 800 }, // Domingo
        { dia: 3, vendas: 900 }, // Segunda-feira
        { dia: 4, vendas: 1000 }, // Terça-feira
        { dia: 5, vendas: 1100 }, // Quarta-feira
        { dia: 6, vendas: 1200 }, // Quinta-feira
        { dia: 7, vendas: 1300 }, // Sexta-feira
        { dia: 8, vendas: 1400 }, // Sábado
        { dia: 9, vendas: 1500 }, // Domingo
        { dia: 10, vendas: 1000 }, // Segunda-feira
        { dia: 11, vendas: 1100 }, // Terça-feira
        { dia: 12, vendas: 1200 }, // Quarta-feira
        { dia: 13, vendas: 1300 }, // Quinta-feira
        { dia: 14, vendas: 1400 }, // Sexta-feira
        { dia: 15, vendas: 1500 }, // Sábado
        { dia: 16, vendas: 1600 }, // Domingo
        { dia: 17, vendas: 1100 }, // Segunda-feira
        { dia: 18, vendas: 1200 }, // Terça-feira
        { dia: 19, vendas: 1300 }, // Quarta-feira
        { dia: 20, vendas: 1400 }, // Quinta-feira
        { dia: 21, vendas: 1500 }, // Sexta-feira
        { dia: 22, vendas: 1600 }, // Sábado
        { dia: 23, vendas: 1700 }, // Domingo
        { dia: 24, vendas: 1200 }, // Segunda-feira
        { dia: 25, vendas: 1300 }, // Terça-feira
        { dia: 26, vendas: 1400 }, // Quarta-feira
        { dia: 27, vendas: 1500 }, // Quinta-feira
        { dia: 28, vendas: 1600 }, // Sexta-feira
      ],
    },
    {
      mes: "2025-3",
      total_vendas_mes: 40000,
      dias: [
        { dia: 1, vendas: 1500 }, // Sábado
        { dia: 2, vendas: 1600 }, // Domingo
        { dia: 3, vendas: 1200 }, // Segunda-feira
        { dia: 4, vendas: 1300 }, // Terça-feira
        { dia: 5, vendas: 1400 }, // Quarta-feira
        { dia: 6, vendas: 1500 }, // Quinta-feira
        { dia: 7, vendas: 1600 }, // Sexta-feira
        { dia: 8, vendas: 1700 }, // Sábado
        { dia: 9, vendas: 1800 }, // Domingo
        { dia: 10, vendas: 1300 }, // Segunda-feira
        { dia: 11, vendas: 1400 }, // Terça-feira
        { dia: 12, vendas: 1500 }, // Quarta-feira
        { dia: 13, vendas: 1600 }, // Quinta-feira
        { dia: 14, vendas: 1700 }, // Sexta-feira
        { dia: 15, vendas: 1800 }, // Sábado
        { dia: 16, vendas: 1900 }, // Domingo
        { dia: 17, vendas: 1400 }, // Segunda-feira
        { dia: 18, vendas: 1500 }, // Terça-feira
        { dia: 19, vendas: 1600 }, // Quarta-feira
        { dia: 20, vendas: 1700 }, // Quinta-feira
        { dia: 21, vendas: 1800 }, // Sexta-feira
        { dia: 22, vendas: 1900 }, // Sábado
        { dia: 23, vendas: 2000 }, // Domingo
        { dia: 24, vendas: 1500 }, // Segunda-feira
        { dia: 25, vendas: 1600 }, // Terça-feira
        { dia: 26, vendas: 1700 }, // Quarta-feira
        { dia: 27, vendas: 1800 }, // Quinta-feira
        { dia: 28, vendas: 1900 }, // Sexta-feira
        { dia: 29, vendas: 2000 }, // Sábado
        { dia: 30, vendas: 2100 }, // Domingo
        { dia: 31, vendas: 2200 }, // Segunda-feira
      ],
    },
  ],
  topItems: [
    { name: "Pizza Margherita", quantity: 156, revenue: 7800 }, // R$ 50,00 por unidade
    { name: "Hambúrguer Clássico", quantity: 142, revenue: 7100 }, // R$ 50,00 por unidade
    { name: "Coca-Cola 2L", quantity: 98, revenue: 980 }, // R$ 10,00 por unidade
    { name: "Batata Frita G", quantity: 87, revenue: 1305 }, // R$ 15,00 por unidade
  ],
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function Dashboard() {
  const [view, setView] = useState<"month" | "day">("month"); // Estado para controlar a visão
  const [selectedMonth, setSelectedMonth] = useState("2025-1"); // Estado para controlar o mês selecionado

  // Função para alternar entre as visões
  const toggleView = () => {
    setView(view === "month" ? "day" : "month");
  };

  // Função para lidar com a mudança de mês na visão diária
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Dados para a visão mensal
  const monthlyData = mockData.salesData.map((month) => ({
    date: month.mes,
    value: month.total_vendas_mes,
  }));

  // Dados para a visão diária (filtrados pelo mês selecionado)
  const dailyData =
    mockData.salesData.find((month) => month.mes === selectedMonth)?.dias || [];

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Clientes"
          value={mockData.stats.customers}
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatsCard
          title="Total de Pedidos"
          value={mockData.stats.orders}
          icon={<ShoppingBag className="h-6 w-6 text-blue-600" />}
        />
        <StatsCard
          title="Faturamento Total"
          value={mockData.stats.revenue}
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
          percentageChange={mockData.stats.revenueChange}
          isCurrency
        />
        <StatsCard
          title="Pedidos Pendentes"
          value={mockData.stats.pendingOrders}
          icon={<Clock className="h-6 w-6 text-blue-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Venda (R$)</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleView}>
                {view === "month" ? "Visão Diária" : "Visão Mensal"}
              </Button>
              {view === "day" && (
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockData.salesData.map((month) => (
                    <option key={month.mes} value={month.mes}>
                      {new Date(month.mes).toLocaleDateString("pt-BR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={view === "month" ? monthlyData : dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={view === "month" ? "date" : "dia"}
                  tickFormatter={(value) => {
                    if (view === "month") {
                      const date = new Date(value);
                      return date.toLocaleDateString("pt-BR", {
                        month: "short",
                      });
                    } else {
                      return `Dia ${value}`;
                    }
                  }}
                />
                <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value) => [
                    `R$ ${value.toLocaleString()}`,
                    "Vendas",
                  ]}
                  labelFormatter={(label) => {
                    if (view === "month") {
                      const date = new Date(label);
                      return date.toLocaleDateString("pt-BR", {
                        month: "long",
                        year: "numeric",
                      });
                    } else {
                      return `Dia ${label}`;
                    }
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={view === "month" ? "value" : "vendas"}
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Mais Vendidos</h2>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {mockData.topItems?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} unidades
                  </p>
                </div>
                <p className="font-semibold text-blue-600">
                  {formatCurrency(item.revenue)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
