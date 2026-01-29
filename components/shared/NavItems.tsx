"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemsProps {
  onItemClick?: () => void;
}

const NavItems = ({ onItemClick }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-center gap-0.5 md:flex-row md:gap-1">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            } flex-center p-medium-16 whitespace-nowrap transition-all duration-300 hover:text-blue-500 hover:font-medium rounded-md px-4 py-2`}
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