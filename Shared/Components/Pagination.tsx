"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber", String(newPage));

    router.replace(`${pathname}?${params.toString()}`);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (page <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } 
    else if (page >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } 
    else {
      pages.push(
        1,
        "...",
        page,
        "...",
        totalPages
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#EFF0F4] px-4 py-4 sm:justify-end">
      
      <button
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        className="
          rounded-lg px-3 py-1.5 
          text-xs font-medium
          text-[#565E74]
          hover:bg-[#f2f4f6]
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:text-sm
        "
      >
        Previous
      </button>

      {getPages().map((item, index) => {
        // Create a unique key by combining the item and its position
        const uniqueKey = item === "..." ? `ellipsis-${index}` : `page-${item}`;
        
        return item === "..." ? (
          <span
            key={uniqueKey}
            className="px-2 text-sm text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={uniqueKey}
            onClick={() => changePage(item as number)}
            className={`
              rounded-lg 
              px-2.5 py-1.5
              text-xs font-medium
              sm:px-3 sm:text-sm
              ${
                page === item
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                  : "text-[#565E74] hover:bg-[#f2f4f6]"
              }
            `}
          >
            {item}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        className="
          rounded-lg px-3 py-1.5
          text-xs font-medium
          text-[#565E74]
          hover:bg-[#f2f4f6]
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:text-sm
        "
      >
        Next
      </button>

    </div>
  );
}