import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "../components/Dashboard/ui/Button";
import { Card } from "../components/Dashboard/ui/Card";
import { Dialog } from "../components/Dashboard/ui/Dialog";
import { CategoryForm } from "../components/Dashboard/categories/CategoryForm";
import { cn } from "../app/utils/cn";
import { Category } from "../types/Category";



const mockCategories: Category[] = [
  {
    id: 1,
    name: "Pizzas",
    isSpecial: true,
    availability: "always",
    availableDays: [],
    isPromotional: false,
    sizes: ["Pequena", "Média", "Grande", "Família"],
    crusts: ["Tradicional", "Integral", "Sem Glúten"],
    borders: ["Catupiry", "Cheddar", "Chocolate"],
    extras: ["Bacon", "Extra Queijo", "Molho Especial"],
  },
  {
    id: 2,
    name: "Bebidas",
    isSpecial: false,
    availability: "always",
    availableDays: [],
    isPromotional: true,
  },
  {
    id: 3,
    name: "Sobremesas",
    isSpecial: false,
    availability: "custom",
    availableDays: ["tue", "wed"], // Exemplo: Apenas disponível terça e quarta-feira
    isPromotional: false,
  },
];

export function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);

  const DAYS_TRANSLATION: Record<string, string> = {
    sun: "Dom",
    mon: "Seg",
    tue: "Ter",
    wed: "Quar",
    thu: "Qui",
    fri: "Sex",
    sat: "Sáb",
  };
  

  const handleSubmit = (data: Category) => {
    if (selectedCategory?.id) {
      // Editar categoria existente
      setCategories((prev) =>
        prev.map((cat) => (cat.id === selectedCategory.id ? { ...cat, ...data } : cat))
      );
    } else {
      const newCategory: Category = {
        ...data,
        id: categories.length + 1, // Geração simples de ID
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gerenciar Categorias</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <div
              className="flex items-center justify-between cursor-pointer p-4"
              onClick={() =>
                setExpandedCategory(expandedCategory === category.id ? null : category.id)
              }
            >
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">{category.name}</h3>
                {category.isPromotional && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Promoção
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {category.availability === "always"
                  ? "Sempre disponível"
                  : category.availability === "weekdays"
                  ? "Dias úteis"
                  : category.availability === "weekends"
                  ? "Finais de semana"
                  : category.availability === "custom"
                  ? category.availableDays
                      .map((day) => DAYS_TRANSLATION[day] || day)
                      .join(", ")
                  : "Não especificado"}
              </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(category);
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(category.id);
                  }}
                >
                  Deletar
                </Button>
                {category.isSpecial && (
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform",
                      expandedCategory === category.id && "transform rotate-180"
                    )}
                  />
                )}
              </div>
            </div>

            {expandedCategory === category.id && category.isSpecial && (
              <div className="border-t p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Tamanhos</h4>
                  <div className="flex gap-2 flex-wrap">
                    {category.sizes.map((size) => (
                      <span 
                        key={size}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tipos de Massa</h4>
                  <div className="flex gap-2 flex-wrap">
                    {category.crusts.map((crust) => (
                      <span 
                        key={crust}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {crust}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Bordas</h4>
                  <div className="flex gap-2 flex-wrap">
                    {category.borders.map((border) => (
                      <span 
                        key={border}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {border}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Adicionais</h4>
                  <div className="flex gap-2 flex-wrap">
                    {category.extras.map((extra) => (
                      <span 
                        key={extra}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {extra}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCategory(null);
        }}
        title={selectedCategory ? "Editar Categoria" : "Nova Categoria"}
      >
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedCategory(null);
          }}
          initialData={selectedCategory}
        />
      </Dialog>
    </div>
  );
}
