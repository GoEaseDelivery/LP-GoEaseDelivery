import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from '../app/utils/cn';

interface InputCurrencyProps {
    error?: string;
    onChange?(value: string): void;
    value?: string;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
    return (
      <div>
        <NumericFormat
          className={cn(
            "w-full h-10   text-gray-800 text-sm placeholder:tracking-wide rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error && "text-red-900"
          )}
          onChange={(event) => onChange?.(event.target.value)}
          thousandSeparator="."
          decimalSeparator=","
          value={value}
          placeholder='R$'
        />
        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
}
