"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface LinkAppProps {
  pathname: string;
  display: string;
  useParams: boolean;
}

const LinkApp: React.FC<LinkAppProps> = ({ pathname, display, useParams }) => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const currentPathname = usePathname();

  const linkClass =
    currentPathname === pathname
      ? "font-bold text-primary"
      : "text-muted-foreground";

  return (
    <Link
      href={
        useParams ? `${pathname}?month=${month}&year=${year}` : `${pathname}`
      }
      className={linkClass}
    >
      {display}
    </Link>
  );
};

export default LinkApp;
