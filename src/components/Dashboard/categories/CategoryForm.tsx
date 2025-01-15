import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';

interface CategoryFormData {
  name: string;
  isSpecial: boolean;
  availability: 'always' | 'weekdays' | 'weekends' | 'custom';
  customDays?: string[];
  validUntil?: string;
  isPromotional: boolean;
  sizes?: string[];
  crusts?: string[];
  borders?: string[];
  extras?: string[];
}

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  initialData?: Partial<CategoryFormData>;
}

export function CategoryForm({ onSubmit, onCancel, initialData }: CategoryFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      isSpecial: false,
      availability: 'always',
      isPromotional: false,
      ...initialData,
    },
  });

  const isSpecial = watch('isSpecial');
  const availability = watch('availability');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nome da Categoria"
        {...register('name', { required: 'Nome é obrigatório' })}
        error={errors.name?.message}
      />

      <Checkbox
        label="Categoria Especial (Pizza)"
        {...register('isSpecial')}
      />

      {isSpecial && (
        <div className="space-y-4 border-l-2 border-blue-200 pl-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanhos Disponíveis
            </label>
            <div className="space-y-2">
              {['Pequena', 'Média', 'Grande', 'Família'].map((size) => (
                <Checkbox
                  key={size}
                  label={size}
                  {...register('sizes')}
                  value={size}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipos de Massa
            </label>
            <div className="space-y-2">
              {['Tradicional', 'Integral', 'Sem Glúten'].map((crust) => (
                <Checkbox
                  key={crust}
                  label={crust}
                  {...register('crusts')}
                  value={crust}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bordas Disponíveis
            </label>
            <div className="space-y-2">
              {['Catupiry', 'Cheddar', 'Chocolate'].map((border) => (
                <Checkbox
                  key={border}
                  label={border}
                  {...register('borders')}
                  value={border}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adicionais
            </label>
            <div className="space-y-2">
              {['Bacon', 'Extra Queijo', 'Molho Especial'].map((extra) => (
                <Checkbox
                  key={extra}
                  label={extra}
                  {...register('extras')}
                  value={extra}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Select
        label="Disponibilidade"
        {...register('availability')}
      >
        <option value="always">Sempre disponível</option>
        <option value="weekdays">Segunda a Sexta</option>
        <option value="weekends">Finais de Semana</option>
        <option value="custom">Personalizado</option>
      </Select>

      {availability === 'custom' && (
        <Input
          type="date"
          label="Disponível até"
          {...register('validUntil')}
        />
      )}

      <Checkbox
        label="Categoria em Promoção"
        {...register('isPromotional')}
      />

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