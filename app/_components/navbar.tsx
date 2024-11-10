"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import LinkApp from "./link-app"; // Ensure the path is correct based on your project structure

const Navbar = () => {
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
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
          useParams={true}
        />
      </div>
      {/* DIREITA */}
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
