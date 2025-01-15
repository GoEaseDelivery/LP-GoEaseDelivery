import { useState } from 'react';
import { Plus, Search, ImagePlus } from 'lucide-react';
import { Button } from '../components/Dashboard/ui/Button';
import { Card } from '../components/Dashboard/ui/Card';
import { Input } from '../components/Dashboard/ui/Input';
import { formatCurrency } from '../app/utils/formatCurrency';
import { cn } from '../app/utils/cn';
import { Dialog } from '../components/Dashboard/ui/Dialog';
import { ProductForm } from '../components/Dashboard/menu/ProductForm';


const mockProducts = [
  {
    id: 1,
    name: 'Pizza Margherita',
    category: 'Pizzas',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
    available: true,
    availability: 'always',
  },
  {
    id: 2,
    name: 'Coca-Cola 2L',
    category: 'Bebidas',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800',
    available: true,
    availability: 'always',
  },
  {
    id: 3,
    name: 'Pudim',
    category: 'Sobremesas',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?w=800',
    available: false,
    availability: 'weekends',
  },
];

export function Menu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = Array.from(
    new Set(mockProducts.map((product) => product.category))
  );

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const toggleAvailability = (productId: number) => {
    console.log('Toggle availability for product:', productId);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Cardápio</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <select
              className="rounded-md border border-gray-300 px-3"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <p className="font-semibold text-blue-600">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAvailability(product.id)}
                      className={cn(
                        'px-2 py-1 text-xs rounded-full',
                        product.available
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      )}
                    >
                      {product.available ? 'Disponível' : 'Esgotado'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
          initialData={selectedProduct}
          categories={categories}
        />
      </Dialog>
    </div>
  );
}