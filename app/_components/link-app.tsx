"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkAppProps {
  pathname: string;
  display: string;
}

const LinkApp: React.FC<LinkAppProps> = ({ pathname, display }) => {
  const currentPathname = usePathname();

  const linkClass =
    currentPathname === pathname
      ? "font-bold text-primary"
      : "text-muted-foreground";

  return (
    <Link href={pathname} className={linkClass}>
      {display}
    </Link>
  );
};

export default LinkApp;
