import { useState } from "react";
import { Plus, Search, ImagePlus, ChevronDown } from "lucide-react";
import { Button } from '../components/Dashboard/ui/Button';
import { Card } from '../components/Dashboard/ui/Card';
import { Input } from '../components/Dashboard/ui/Input';
import { Dialog } from '../components/Dashboard/ui/Dialog';
import { ProductForm } from '../components/Dashboard/menu/ProductForm';
import { formatCurrency } from '../app/utils/formatCurrency';
import { cn } from '../app/utils/cn';


const mockCategories = [
  {
    id: 1,
    name: "Pizzas",
    products: [
      {
        id: 1,
        name: "Pizza Margherita",
        price: 45.9,
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
        available: true,
        availability: "always",
      },
      {
        id: 4,
        name: "Pizza Calabresa",
        price: 42.9,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        available: true,
        availability: "always",
      },
    ],
  },
  {
    id: 2,
    name: "Bebidas",
    products: [
      {
        id: 2,
        name: "Coca-Cola 2L",
        price: 12.9,
        image:
          "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
        available: true,
        availability: "always",
      },
      {
        id: 5,
        name: "Suco Natural",
        price: 8.9,
        image:
          "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800",
        available: true,
        availability: "always",
      },
    ],
  },
  {
    id: 3,
    name: "Sobremesas",
    products: [
      {
        id: 3,
        name: "Pudim",
        price: 15.9,
        image:
          "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?w=800",
        available: false,
        availability: "weekends",
      },
      {
        id: 6,
        name: "Sorvete",
        price: 12.9,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        available: true,
        availability: "always",
      },
    ],
  },
];

export function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const toggleAvailability = (productId: number) => {
    console.log("Toggle availability for product:", productId);
  };

  const filteredCategories = mockCategories
    .map((category) => ({
      ...category,
      products: category.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.products.length > 0);

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
        <div className="p-4 space-y-6">
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
          </div>

          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{category.name}</h3>
                    <span className="text-sm text-gray-500">
                      ({category.products.length}{" "}
                      {category.products.length === 1 ? "item" : "itens"})
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-500 transition-transform",
                      expandedCategories.includes(category.id) &&
                        "transform rotate-180"
                    )}
                  />
                </button>

                {expandedCategories.includes(category.id) && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.products.map((product) => (
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
                              <p className="text-sm text-gray-600">
                                {category.name}
                              </p>
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
                                "px-2 py-1 text-xs rounded-full",
                                product.available
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              )}
                            >
                              {product.available ? "Disponível" : "Esgotado"}
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
                )}
              </div>
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
        title={selectedProduct ? "Editar Produto" : "Novo Produto"}
      >
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
          initialData={selectedProduct}
          categories={mockCategories.map((c) => c.name)}
        />
      </Dialog>
    </div>
  );
}
