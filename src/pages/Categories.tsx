import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '../components/Dashboard/ui/Button';
import { Card } from '../components/Dashboard/ui/Card';
import { Dialog } from '../components/Dashboard/ui/Dialog';
import { CategoryForm } from '../components/Dashboard/categories/CategoryForm';
import { cn } from '../app/utils/cn';

const mockCategories = [
  {
    id: 1,
    name: 'Pizzas',
    isSpecial: true,
    sizes: ['Pequena', 'Média', 'Grande', 'Família'],
    crusts: ['Tradicional', 'Integral', 'Sem Glúten'],
    borders: ['Catupiry', 'Cheddar', 'Chocolate'],
    extras: ['Bacon', 'Extra Queijo', 'Molho Especial'],
    availability: 'always',
    isPromotional: false,
  },
  {
    id: 2,
    name: 'Bebidas',
    isSpecial: false,
    availability: 'always',
    isPromotional: true,
  },
  {
    id: 3,
    name: 'Sobremesas',
    isSpecial: false,
    availability: 'weekends',
    isPromotional: false,
  },
];

export function Categories() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
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
        {mockCategories.map((category) => (
          <Card key={category.id}>
            <div 
              className="flex items-center justify-between cursor-pointer p-4"
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
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
                  {category.availability === 'always' 
                    ? 'Sempre disponível'
                    : 'Disponível aos finais de semana'
                  }
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
                <ChevronDown 
                  className={cn(
                    'h-5 w-5 transition-transform',
                    expandedCategory === category.id && 'transform rotate-180'
                  )} 
                />
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
        title={selectedCategory ? 'Editar Categoria' : 'Nova Categoria'}
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