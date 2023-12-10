import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, IInputProps>(({
    className,
    ...props
}, ref) => {
    return (
        <input 
            className={twMerge(`w-full flex rounded-md bg-neutral-700 border border-transparent p-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`, className)} ref={ref} {...props} 
        />
    )
})

Input.displayName = 'Input';
