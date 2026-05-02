"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString()
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-4">
      {/* Previous */}
      <Button
        size="lg"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm border-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
        style={{
          background:
            Number(page) <= 1
              ? "rgba(255,255,255,0.05)"
              : "rgba(253,224,71,0.1)",
          border: "1px solid rgba(253,224,71,0.2)",
          color: Number(page) <= 1 ? "rgba(255,255,255,0.3)" : "#fde047"
        }}
      >
        ← Prev
      </Button>

      {/* Page indicator */}
      <div
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl"
        style={{
          background: "rgba(253,224,71,0.08)",
          border: "1px solid rgba(253,224,71,0.15)"
        }}
      >
        <span className="text-yellow-300 font-black text-sm">{page}</span>
        <span className="text-white/30 text-xs">/</span>
        <span className="text-white/40 text-sm">{totalPages}</span>
      </div>

      {/* Next */}
      <Button
        size="lg"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm border-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
        style={{
          background:
            Number(page) >= totalPages
              ? "rgba(255,255,255,0.05)"
              : "rgba(253,224,71,0.1)",
          border: "1px solid rgba(253,224,71,0.2)",
          color:
            Number(page) >= totalPages ? "rgba(255,255,255,0.3)" : "#fde047"
        }}
      >
        Next →
      </Button>
    </div>
  );
};

export default Pagination;
