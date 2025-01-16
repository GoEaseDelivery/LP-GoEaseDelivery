import React from "react";
import { useForm } from "react-hook-form";
import { Percent, DollarSign, Search } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';


interface CouponFormData {
  code: string;
  type: "percentage" | "fixed";
  discount: number;
  validUntil: string;
  minPurchase: number;
  usageLimit: number | null;
  purchaseLimit: boolean;
  purchaseCount: number;
  specificProducts: boolean;
  specificCustomers: boolean;
  selectedProducts: string[];
  selectedCustomers: string[];
}

interface CouponFormProps {
  onSubmit: (data: CouponFormData) => void;
  onCancel: () => void;
  initialData?: Partial<CouponFormData>;
}

const mockProducts = [
  { id: "1", name: "Pizza Margherita", category: "Pizzas" },
  { id: "2", name: "Pizza Calabresa", category: "Pizzas" },
  { id: "3", name: "Refrigerante Cola", category: "Bebidas" },
];

const mockCustomers = [
  { id: "1", name: "João Silva", email: "joao@email.com" },
  { id: "2", name: "Maria Santos", email: "maria@email.com" },
];

export function CouponForm({
  onSubmit,
  onCancel,
  initialData,
}: CouponFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      code: "",
      type: "percentage",
      discount: 0,
      validUntil: new Date().toISOString().split("T")[0],
      minPurchase: 0,
      usageLimit: null,
      purchaseLimit: false,
      purchaseCount: 0,
      specificProducts: false,
      specificCustomers: false,
      selectedProducts: [],
      selectedCustomers: [],
      ...initialData,
    },
  });

  const [productSearch, setProductSearch] = React.useState("");
  const [customerSearch, setCustomerSearch] = React.useState("");

  const type = watch("type");
  const purchaseLimit = watch("purchaseLimit");
  const specificProducts = watch("specificProducts");
  const specificCustomers = watch("specificCustomers");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Código do Cupom">
        <Input
          placeholder="Código do Cupom"
          {...register("code", { required: "Código é obrigatório" })}
          error={errors.code?.message}
        />
      </FormField>

      <div className="flex  gap-4 ">
        <FormField label="Tipo de Desconto ">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setValue("type", "percentage")}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                type === "percentage"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100"
              }`}
            >
              <Percent className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setValue("type", "fixed")}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                type === "fixed" ? "bg-blue-100 text-blue-600" : "bg-gray-100"
              }`}
            >
              <DollarSign className="h-5 w-5" />
            </button>
          </div>
        </FormField>
        <FormField label="Valor do Desconto">
          <CurrencyInput
            placeholder={type === "percentage" ? "Porcentagem" : "Valor"}
            prefix={type === "fixed" ? "R$ " : ""}
            suffix={type === "percentage" ? "%" : ""}
            decimalsLimit={type === "percentage" ? 0 : 2}
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value) => setValue("discount", Number(value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <FormField label="Valor do Desconto">
        <CurrencyInput
          placeholder={type === "percentage" ? "Porcentagem" : "Valor"}
          prefix={type === "fixed" ? "R$ " : ""}
          suffix={type === "percentage" ? "%" : ""}
          decimalsLimit={type === "percentage" ? 0 : 2}
          decimalSeparator=","
          groupSeparator="."
          onValueChange={(value) => setValue("discount", Number(value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Validade">
          <Input
            type="date"
            {...register("validUntil", { required: "Data é obrigatória" })}
            error={errors.validUntil?.message}
          />
        </FormField>

        <FormField label="Compra Mínima">
          <CurrencyInput
            prefix="R$ "
            decimalSeparator=","
            groupSeparator="."
            decimalsLimit={2}
            onValueChange={(value) => setValue("minPurchase", Number(value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Habilitar limite por quantidade de compras"
          {...register("purchaseLimit")}
        />

        {purchaseLimit && (
          <div className="pl-6 space-y-2">
            <FormField label="Quantidade de compras necessárias">
              <Input
                type="number"
                {...register("purchaseCount", { min: 1 })}
                error={errors.purchaseCount?.message}
              />
            </FormField>
            <p className="text-sm text-gray-600">
              O cliente receberá o desconto automaticamente após realizar o
              número especificado de compras
            </p>
          </div>
        )}

        <Checkbox
          label="Aplicar apenas para produtos específicos"
          {...register("specificProducts")}
        />

        {specificProducts && (
          <div className="pl-6 space-y-4">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredProducts.map((product) => (
                <Checkbox
                  key={product.id}
                  label={`${product.name} (${product.category})`}
                  value={product.id}
                  {...register("selectedProducts")}
                />
              ))}
            </div>
          </div>
        )}

        <Checkbox
          label="Aplicar apenas para clientes específicos"
          {...register("specificCustomers")}
        />

        {specificCustomers && (
          <div className="pl-6 space-y-4">
            <Input
              type="search"
              placeholder="Buscar clientes..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <Checkbox
                  key={customer.id}
                  label={`${customer.name} (${customer.email})`}
                  value={customer.id}
                  {...register("selectedCustomers")}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
