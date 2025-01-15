import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import { formatCurrency } from '../app/utils/formatCurrency';
import { Input } from '../components/Dashboard/ui/Input';
import { Card } from '../components/Dashboard/ui/Card';
import { Button } from '../components/Dashboard/ui/Button';
import { Dialog } from '../components/Dashboard/ui/Dialog';
import { CouponForm } from '../components/Dashboard/coupons/CouponForm';

const mockCoupons = [
  {
    id: 1,
    code: 'PRIMEIRA10',
    discount: 10,
    type: 'percentage',
    validUntil: '2024-12-31',
    minPurchase: 50,
    usageLimit: 1,
    usageCount: 0,
    purchaseLimit: true,
    purchaseCount: 20,
  },
  {
    id: 2,
    code: 'FRETE20',
    discount: 20,
    type: 'fixed',
    validUntil: '2024-06-30',
    minPurchase: 100,
    usageLimit: null,
    usageCount: 15,
    purchaseLimit: false,
    purchaseCount: 0,
  },
];

export function Coupons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedCoupon(null);
  };

  const handleEdit = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsFormOpen(true);
  };

  const handleDelete = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting coupon:', selectedCoupon);
    setIsDeleteDialogOpen(false);
    setSelectedCoupon(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gerenciar Cupons</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar cupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Código</th>
                <th className="text-left py-3 px-4">Desconto</th>
                <th className="text-left py-3 px-4">Validade</th>
                <th className="text-left py-3 px-4">Compra Mínima</th>
                <th className="text-left py-3 px-4">Limite de Uso</th>
                <th className="text-left py-3 px-4">Usos</th>
                <th className="text-right py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockCoupons.map((coupon) => (
                <tr key={coupon.id} className="border-b">
                  <td className="py-3 px-4">{coupon.code}</td>
                  <td className="py-3 px-4">
                    {coupon.type === 'percentage' 
                      ? `${coupon.discount}%` 
                      : formatCurrency(coupon.discount)
                    }
                  </td>
                  <td className="py-3 px-4">
                    {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">{formatCurrency(coupon.minPurchase)}</td>
                  <td className="py-3 px-4">
                    {coupon.usageLimit === null ? 'Ilimitado' : coupon.usageLimit}
                  </td>
                  <td className="py-3 px-4">{coupon.usageCount}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(coupon)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(coupon)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCoupon(null);
        }}
        title={selectedCoupon ? 'Editar Cupom' : 'Novo Cupom'}
      >
        <CouponForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedCoupon(null);
          }}
          initialData={selectedCoupon}
        />
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCoupon(null);
        }}
        title="Confirmar Exclusão"
      >
        <div className="space-y-4">
          <p>
            Tem certeza que deseja excluir o cupom{' '}
            <strong>{selectedCoupon?.code}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedCoupon(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}