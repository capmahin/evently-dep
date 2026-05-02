"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface NavItemsProps {
  onItemClick?: () => void;
}

const NavItems = ({ onItemClick }: NavItemsProps) => {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role as string | undefined;

  const filteredLinks = headerLinks.filter((link) => {
    if (!link.role) return true;
    return link.role === role;
  });

  return (
    <ul className="md:flex-between flex w-full flex-col items-center gap-0.5 md:flex-row md:gap-1">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-yellow-300 font-semibold" : "text-white/60"
            } flex-center p-medium-16 whitespace-nowrap transition-all duration-300 hover:text-yellow-300 hover:font-medium rounded-md px-4 py-2`}
          >
            <Link
              href={link.route}
              className="block w-full text-center hover:scale-105 transition-transform duration-200"
              onClick={onItemClick}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;