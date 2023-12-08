import { IRoute } from "@/types"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export const SidebarItem:React.FC<IRoute> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
  return (
    <Link href={href} className={twMerge(`flex flex-row h-auto w-full items-center gap-x-4 font-medium text-base cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && 'text-white')}>
        <Icon size={26} />
        <p className="w-full truncate">{label}</p>
    </Link>
  )
}
