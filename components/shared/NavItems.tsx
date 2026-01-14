"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-1 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            } flex-center p-medium-16 whitespace-nowrap transition-all duration-300 hover:text-blue-500 hover:font-medium rounded-md px-2 py-1`}
          >
            <Link href={link.route} className="block w-full text-center hover:scale-105 transition-transform duration-200">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
