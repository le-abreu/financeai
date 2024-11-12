"use client";

import Image from "next/image";
import LinkApp from "./link-app";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Correto uso de useState

  return (
    <nav className="relative flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        {/* Logo sempre visível fora do menu */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-700 md:hidden"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menu overlay que cobre toda a tela no mobile */}
      <div
        className={`${isOpen ? "fixed inset-0 z-50 bg-black" : "hidden"} flex flex-col items-center justify-center space-y-8 px-4 py-8`}
      >
        {/* Logo também visível dentro do menu quando aberto */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <LinkApp pathname="/" display="Dashboard" useParams={true} />
        <LinkApp
          pathname="/transactions"
          display="Transações"
          useParams={true}
        />
        <LinkApp
          pathname="/subscription"
          display="Assinatura"
          useParams={false}
        />
        <UserButton showName />
        <button
          onClick={() => setIsOpen(false)} // Botão para fechar o menu
          className="mt-5 rounded border border-gray-400 px-4 py-2 text-gray-700"
        >
          Fechar
        </button>
      </div>

      <div className="hidden md:flex">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
