"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"]
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      {/* Trigger */}
      <SelectTrigger
        className="h-[54px] w-full rounded-xl border border-white/10 focus:ring-0 focus:ring-offset-0 text-white/60 text-sm transition-colors duration-200 hover:border-yellow-300/30"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-yellow-300/50 text-base">🏷️</span>
          <SelectValue placeholder="Filter by subject" />
        </div>
      </SelectTrigger>

      {/* Content */}
      <SelectContent
        className="rounded-xl border border-yellow-300/20 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)"
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-white/5">
          <p className="text-yellow-300 text-[10px] tracking-widest uppercase font-bold">
            📚 Filter by Subject
          </p>
        </div>

        {/* All option */}
        <SelectItem
          value="All"
          className="text-white/70 text-sm hover:text-white focus:text-white focus:bg-yellow-300/10 cursor-pointer py-2.5 px-3"
        >
          <span className="flex items-center gap-2">
            <span className="text-yellow-300/50 text-xs">◉</span>
            All Subjects
          </span>
        </SelectItem>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2 my-1" />

        {/* Category list */}
        {categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem
              value={category.name}
              key={String(category._id)}
              className="text-white/70 text-sm hover:text-white focus:text-white focus:bg-yellow-300/10 cursor-pointer py-2.5 px-3"
            >
              <span className="flex items-center gap-2">
                <span className="text-yellow-300/50 text-xs">▸</span>
                {category.name}
              </span>
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-4 text-center text-white/30 text-xs">
            No subjects found
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
