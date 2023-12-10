import { create } from "zustand";

import { IModal } from "@/types";

export const useAuthModal = create<IModal>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}))
