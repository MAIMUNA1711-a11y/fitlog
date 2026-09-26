"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      hideProgressBar
      newestOnTop
      closeOnClick
      theme="dark"
      toastClassName="!bg-[#1a1a1a] !text-white !border !border-white/10"
    />
  );
}