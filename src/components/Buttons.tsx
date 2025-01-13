import {  ComponentProps } from 'react';
import { Spinner } from './Spinner';
import { cn } from '../app/utils/cn';

interface ButtonProps extends ComponentProps<"button"> {
   isLoading?: boolean; 
}
export function Button({isLoading, className, disabled, children, ...props}: ButtonProps) {

    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={cn(
                "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all active:bg-blue-800 flex items-center justify-center",
                className
            )}
        >
            {!isLoading && children}
            {isLoading && <Spinner classname="w-6 h-6" />}
        </button>
    )
}