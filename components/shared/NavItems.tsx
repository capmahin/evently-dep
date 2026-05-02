"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Home, FileText, ClipboardList, PlusSquare,
  BarChart2, Users, UserCheck, LucideIcon
} from "lucide-react";

interface NavItemsProps {
  onItemClick?: () => void;
  collapsed?: boolean;
}

const routeIconMap: Record<string, LucideIcon> = {
  "/":              Home,
  "/assignments":   FileText,
  "/profile":       ClipboardList,
  "/events/create": PlusSquare,
  "/marks":         BarChart2,
  "/students":      Users,
  "/teachers":      UserCheck,
};

const NavItems = ({ onItemClick, collapsed }: NavItemsProps) => {
  const pathname = usePathname();
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role as string | undefined;

  const filteredLinks = headerLinks.filter((link) => {
    if (!link.role) return true;
    return link.role === role;
  });

  return (
    <ul className="flex flex-col gap-0.5 w-full">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.route;
        const Icon = routeIconMap[link.route];

        return (
          <li key={link.route}>
            <Link
              href={link.route}
              onClick={onItemClick}
              title={collapsed ? link.label : undefined}
              className={`flex items-center rounded-lg transition-all duration-200 group
                ${collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5 w-full"}
                ${isActive
                  ? "bg-yellow-300/12 border border-yellow-300/20 text-yellow-300"
                  : "border border-transparent text-white/50 hover:text-white/90 hover:bg-white/6"
                }
              `}
            >
              {Icon && (
                <Icon
                  className={`flex-shrink-0 transition-colors duration-200 ${
                    collapsed ? "w-4 h-4" : "w-[15px] h-[15px]"
                  } ${
                    isActive
                      ? "text-yellow-300"
                      : "text-white/35 group-hover:text-white/70"
                  }`}
                />
              )}
              {!collapsed && (
                <span className="text-[13px] font-medium whitespace-nowrap leading-none">
                  {link.label}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;