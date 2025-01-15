import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import CurrencyInput from 'react-currency-input-field';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';


interface CouponFormData {
  code: string;
  type: 'percentage' | 'fixed';
  discount: number;
  validUntil: string;
  minPurchase: number;
  usageLimit: number | null;
  purchaseLimit: boolean;
  purchaseCount: number;
  specificProducts: boolean;
  specificCustomers: boolean;
}

interface CouponFormProps {
  onSubmit: (data: CouponFormData) => void;
  onCancel: () => void;
  initialData?: Partial<CouponFormData>;
}

export function CouponForm({ onSubmit, onCancel, initialData }: CouponFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CouponFormData>({
    defaultValues: {
      code: '',
      type: 'percentage',
      discount: 0,
      validUntil: new Date().toISOString().split('T')[0],
      minPurchase: 0,
      usageLimit: null,
      purchaseLimit: false,
      purchaseCount: 0,
      specificProducts: false,
      specificCustomers: false,
      ...initialData,
    },
  });

  const purchaseLimit = watch('purchaseLimit');
  const specificProducts = watch('specificProducts');
  const specificCustomers = watch('specificCustomers');

  const handleDiscountChange = (value: string | undefined) => {
    // Remove o símbolo de moeda e converte para número
    const numericValue = value ? parseFloat(value.replace('R$', '').replace(',', '.')) : 0;
    setValue('discount', numericValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Código do Cupom">
        <Input
          placeholder="Código do Cupom"
          {...register('code', { required: 'Código é obrigatório' })}
          error={errors.code?.message}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tipo de Desconto">
          <Select
            placeholder="Tipo de Desconto"
            {...register('type')}
          >
            <option value="percentage">Porcentagem</option>
            <option value="fixed">Valor Fixo</option>
          </Select>
        </FormField>

        <FormField label="Valor do Desconto">
          <CurrencyInput
            placeholder="Valor do Desconto"
            prefix="R$"
            decimalSeparator=","
            groupSeparator="."
            decimalsLimit={2}
            onValueChange={handleDiscountChange}
            defaultValue={initialData?.discount || 0}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Validade do Cupom">
          <Input
            type="date"
            {...register('validUntil', { required: 'Data é obrigatória' })}
            error={errors.validUntil?.message}
          />
        </FormField>

        <FormField label="Compra Mínima">
          <Input
            type="number"
            {...register('minPurchase', { min: 0 })}
            error={errors.minPurchase?.message}
          />
        </FormField>
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Habilitar limite por quantidade de compras"
          {...register('purchaseLimit')}
        />

        {purchaseLimit && (
          <FormField label="Quantidade de Compras Necessárias">
            <Input
              type="number"
              {...register('purchaseCount', { min: 1 })}
              error={errors.purchaseCount?.message}
            />
          </FormField>
        )}

        <Checkbox
          label="Aplicar apenas para produtos específicos"
          {...register('specificProducts')}
        />

          
        {specificProducts && (
          <FormField label="Quantidade de Compras Necessárias">
            <Input
              type="number"
              {...register('purchaseCount', { min: 1 })}
              error={errors.purchaseCount?.message}
            />
          </FormField>
        )}

        <Checkbox
          label="Aplicar apenas para clientes específicos"
          {...register('specificCustomers')}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}