"use client";

import { useEffect, useState } from "react";

import { AuthModal } from "@/components/auth-modal";
import { UploadModal } from "@/components/upload-modal";

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
      <AuthModal />
      <UploadModal />
    </>
  )
}
