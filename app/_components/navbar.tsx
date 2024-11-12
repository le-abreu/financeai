"use client";

import Image from "next/image";
import LinkApp from "./link-app";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controle de visibilidade do menu

  return (
    <nav className="relative flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        {/* Logo sempre visível */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />

        {/* Links do menu visíveis em telas grandes */}
        <div className="hidden md:flex md:gap-10">
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
        </div>
      </div>

      {/* Botão do menu visível apenas em mobile */}
      {/* Botão de menu hamburguer alinhado à direita em dispositivos móveis */}
      <div className="ml-auto md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-700"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Botão do usuário visível em telas grandes */}
      <div className="hidden md:flex">
        <UserButton showName />
      </div>

      {/* Menu overlay alinhado à direita em dispositivos móveis */}
      <div
        className={`${isOpen ? "fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-xs flex-col items-center justify-center space-y-8 bg-black px-4 py-8" : "hidden"} md:hidden`}
      >
        {/* Logo também visível dentro do menu quando aberto */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />

        {/* Links do menu em formato vertical para mobile */}
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

        {/* Botão do usuário em formato de menu mobile */}
        <UserButton showName />

        {/* Botão para fechar o menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-700"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <title>Menu</title>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
