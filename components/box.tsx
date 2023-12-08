import { twMerge } from 'tailwind-merge';

interface IBoxProps {
    children: React.ReactNode,
    className?: string
}

export const Box: React.FC<IBoxProps> = ({
    children, 
    className
}) => {
  return (
    <div className={twMerge(` bg-neutral-900 rounded-lg w-full h-fit`, className)}>{children}</div>
  )
}
