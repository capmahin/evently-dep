"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({
  placeholder = "Search assignments..."
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"]
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div
      className="flex items-center gap-3 min-h-[54px] w-full overflow-hidden rounded-xl px-4 py-2 border border-white/10 focus-within:border-yellow-300/40 transition-colors duration-200"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      {/* Search Icon */}
      <span className="text-yellow-300/50 text-lg shrink-0">🔍</span>

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 bg-transparent text-white placeholder:text-white/30 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
      />

      {/* Live indicator */}
      {query && (
        <div
          className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-full"
          style={{
            background: "rgba(253,224,71,0.1)",
            border: "1px solid rgba(253,224,71,0.2)"
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
          <span className="text-yellow-300 text-[10px] font-bold tracking-widest uppercase">
            Searching
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;
