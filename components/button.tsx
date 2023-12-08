import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
        {...props}
        ref={ref}
        type={type} 
        disabled={disabled}
        className={twMerge(`w-full rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black text-base font-bold hover:opacity-75 transition`, className)}
        >
            {children}
        </button>
    )
})
Button.displayName = 'Button';