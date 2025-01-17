import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../app/utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const [checked, setChecked] = useState(props.checked || false);

    const handleChange = () => {

      setChecked(!checked);
    };

    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <div className="">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onClick={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-5 w-5 border rounded",
              "flex items-center justify-center",
              checked
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-300",
              className
            )}
          >
            {checked && <Check className="h-3.5 w-3.5 text-white" />}
          </div>
        </div>
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  }
);