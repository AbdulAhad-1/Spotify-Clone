import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface IModalProps {
    isOpen: boolean,
    onChange: (open: boolean) => void,
    title: string,
    description: string,
    children: React.ReactNode
}
export const Modal: React.FC<IModalProps> = ({
    isOpen,
    title,
    description,
    children,
    onChange
}) => {
  return (
    <Dialog.Root 
        open={isOpen}
        defaultOpen={isOpen}
        onOpenChange={onChange}
    >
        <Dialog.Portal>
            <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
            <Dialog.Content className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-full max-w-[90vw] w-full h-full md:max-h-[85vh] md:h-auto md:w-[90%] md:max-w-[450px] rounded-md bg-neutral-800 p-[25px] focus:outline-none'>
                <Dialog.Title className="text-xl text-center font-bold mb-4 w-full">
                    {title}
                </Dialog.Title>
                <Dialog.Description className="mb-5 text-sm leading-normal text-center">{description}</Dialog.Description>
                <div>{children}</div>
                <Dialog.DialogClose asChild className="absolute top-[15px] right-[15px]">
                    <button className="text-neutral-400 hover:text-white">
                        <IoMdClose />
                    </button>
                </Dialog.DialogClose>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}
