"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted) {
    return null;
  }

  return (
    <>
        <Modal 
            isOpen={false} 
            title="Test Modal" 
            description="test" 
            onChange={() => {}}
        >
            Modal Children
        </Modal>
    </>
  )
}
