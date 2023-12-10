import { useLoadImage } from "@/custom-hooks"
import { ISong } from "@/types"
import Image from "next/image"
import { FaPlay } from "react-icons/fa"
import { PlayButton } from "./play-button"

type IProps = {
    data: ISong,
    onClick: (id: string) => void
}
export const SongItem:React.FC<IProps> = ({
    data,
    onClick
}) => {
  const imagePath = useLoadImage(data);
  return (
    <div onClick={() => onClick(data.id)} className="relative group flex flex-col items-center justify-center overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <div className="relative aspect-square w-full h-full overflow-hidden rounded-md">
            <Image fill src={imagePath || '/images/liked.png'} alt="Image" className="object-cover"/>
        </div>
        <div className="flex flex-col justify-start w-full pt-4 gap-y-1">
            <p className="font-semibold w-full truncate">{data.title}</p>
            <p className="text-neutral-400 truncate text-sm pb-4 w-full">By {data.author}</p>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    </div>
  )
}
