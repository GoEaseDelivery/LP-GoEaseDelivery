import React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../../app/utils/cn';


interface CategoryFormData {
  name: string;
  isSpecial: boolean;
  availability: "always" | "weekdays" | "weekends" | "custom";
  availableDays: string[];
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

const DAYS_OF_WEEK = [
  { value: "sun", label: "D" },
  { value: "mon", label: "S" },
  { value: "tue", label: "T" },
  { value: "wed", label: "Q" },
  { value: "thu", label: "Q" },
  { value: "fri", label: "S" },
  { value: "sat", label: "S" },
];

const PIZZA_OPTIONS = {
  sizes: ["Pequena", "Média", "Grande", "Família"],
  crusts: ["Tradicional", "Integral", "Sem Glúten"],
  borders: ["Catupiry", "Cheddar", "Chocolate"],
  extras: ["Bacon", "Extra Queijo", "Molho Especial"],
};

export function CategoryForm({
  onSubmit,
  onCancel,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      isSpecial: false,
      availability: "always",
      availableDays: [],
      isPromotional: false,
      ...initialData,
    },
  });

  const isSpecial = watch("isSpecial");
  const availability = watch("availability");
  const availableDays = watch("availableDays") || [];

  const toggleDay = (day: string) => {
    const currentDays = availableDays;
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    setValue("availableDays", newDays);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nome da Categoria"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />

      <Checkbox label="Categoria Especial (Pizza)" {...register("isSpecial")} />

      {isSpecial && (
        <div className="space-y-6 border-l-2 border-blue-200 pl-4">
          {Object.entries(PIZZA_OPTIONS).map(([key, options]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key === "sizes" && "Tamanhos"}
                {key === "crusts" && "Tipos de Massa"}
                {key === "borders" && "Bordas"}
                {key === "extras" && "Adicionais"}
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const fieldName = key as keyof Pick<
                    CategoryFormData,
                    "sizes" | "crusts" | "borders" | "extras"
                  >;
                  const isSelected = watch(fieldName)?.includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        const current = watch(fieldName) || [];
                        setValue(
                          fieldName,
                          current.includes(option)
                            ? current.filter((item) => item !== option)
                            : [...current, option]
                        );
                      }}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors",
                        isSelected
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Disponibilidade
        </label>
        <div className="flex justify-between gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => toggleDay(day.value)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                availableDays.includes(day.value)
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <Checkbox label="Categoria em Promoção" {...register("isPromotional")} />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
