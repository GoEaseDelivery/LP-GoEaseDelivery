import React from 'react';
import { useForm } from 'react-hook-form';
import { ImagePlus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { InputCurrency } from '../../InputCurrency';
import CurrencyInput from 'react-currency-input-field';


interface ProductFormData {
  name: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  availability: 'always' | 'weekdays' | 'weekends' | 'custom';
  validUntil?: string;
  customDays?: string[];
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ProductFormData>;
  categories: string[];
}

export function ProductForm({ onSubmit, onCancel, initialData, categories }: ProductFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      image: '',
      available: true,
      availability: 'always',
      ...initialData,
    },
  });

  const availability = watch('availability');
  const [previewImage, setPreviewImage] = React.useState(initialData?.image || '');



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setValue('image', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImagePlus className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <Input
        label="Nome do Produto"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />

      <Select
        label="Categoria"
        {...register("category", { required: "Categoria é obrigatória" })}
        error={errors.category?.message}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Input
        label="Preço"
        type="text"
        {...register("price", {
          required: "Preço é obrigatório",
          pattern: {
            value: /^\d+(\,\d{0,2})?$/,
            message: "Formato inválido. Use vírgula para decimais",
          },
        })}
        error={errors.price?.message}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d,]/g, "");
          e.target.value = value;
        }}
      />
      <CurrencyInput
      placeholder='R$'
        prefix="R$"
        decimalsLimit={2}
        decimalSeparator=","
        groupSeparator="."
        {...register("price")}
        // onValueChange={(value) => setValue("discount", Number(value))}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Checkbox label="Produto Disponível" {...register("available")} />

      <Select label="Disponibilidade" {...register("availability")}>
        <option value="always">Sempre disponível</option>
        <option value="weekdays">Segunda a Sexta</option>
        <option value="weekends">Finais de Semana</option>
        <option value="custom">Personalizado</option>
      </Select>

      {availability === "custom" && (
        <Input type="date" label="Disponível até" {...register("validUntil")} />
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}