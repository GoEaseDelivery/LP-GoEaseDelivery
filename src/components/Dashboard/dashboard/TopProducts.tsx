import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableCell } from '@/components/ui/Table';

const topProducts = [
  {
    id_produto: 1,
    nome: 'Pizza Margherita',
    categoria: 'Alimentação',
    quantidade_vendida: 156,
    valor_total_vendas: 7800.00
  },
  {
    id_produto: 2,
    nome: 'Hambúrguer Clássico',
    categoria: 'Alimentação',
    quantidade_vendida: 142,
    valor_total_vendas: 7100.00
  },
  {
    id_produto: 3,
    nome: 'Coca-Cola 2L',
    categoria: 'Bebidas',
    quantidade_vendida: 98,
    valor_total_vendas: 980.00
  },
  {
    id_produto: 4,
    nome: 'Batata Frita G',
    categoria: 'Alimentação',
    quantidade_vendida: 87,
    valor_total_vendas: 1305.00
  },
  {
    id_produto: 5,
    nome: 'Sorvete de Chocolate',
    categoria: 'Sobremesas',
    quantidade_vendida: 120,
    valor_total_vendas: 2400.00
  }
];

export function TopProducts() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Top 5 Produtos Mais Vendidos</h2>
      <Table>
        <TableHeader>
          <TableCell className="font-medium">Nome</TableCell>
          <TableCell className="font-medium">Categoria</TableCell>
          <TableCell className="font-medium">Quantidade Vendida</TableCell>
          <TableCell className="font-medium">Valor Total</TableCell>
        </TableHeader>
        <tbody className="divide-y divide-gray-200">
          {topProducts.map((product) => (
            <TableRow key={product.id_produto}>
              <TableCell>{product.nome}</TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell>{product.quantidade_vendida}</TableCell>
              <TableCell>
                {product.valor_total_vendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}