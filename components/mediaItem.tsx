import Image from "next/image"

import { ISong } from "@/types"
import { useLoadImage } from "@/custom-hooks"

import { PlayButton } from "./play-button"

type IProps = {
    data: ISong,
    onClick?: (id: string) => void
}
export const MediaItem:React.FC<IProps> = ({
    data,
    onClick
}) => {
  const imagePath = useLoadImage(data);

  const handleClick = () => {
    if(onClick) {
        onClick(data.id)
    }
  }
  return (
    <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800 w-full p-2 rounded-md">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
            <Image src={imagePath || '/images/liked.png'} alt="Image" fill className="objet-cover" />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">{data.title}</p>
            <p className="text-neutral-400 text-sm truncate">{data.author}</p>
        </div>
    </div>
  )
}
