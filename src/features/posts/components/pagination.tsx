"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { POSTS_PER_PAGE } from "@/lib/constants";

type PaginationProps = { currentPage: number; postsCount: number };

export const Pagination = ({ currentPage, postsCount }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(postsCount / POSTS_PER_PAGE);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pg", String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const pagination = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {pagination.map((page, i) => {
          let position: "first" | "last" | "single" | "middle" | undefined;
          if (i === 0) position = "first";
          if (i === pagination.length - 1) position = "last";
          if (pagination.length === 1) position = "single";
          if (page === "...") position = "middle";
          const isActive = page === currentPage;

          return (
            <PaginationNumber
              key={page}
              page={page}
              href={createPageURL(page)}
              position={position}
              isActive={isActive}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

type PaginationArrowProps = {
  isDisabled: boolean;
  direction: "left" | "right";
  href: string;
};

const PaginationArrow = ({
  isDisabled,
  direction,
  href,
}: PaginationArrowProps) => {
  const className = cn(
    "flex size-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-neutral-300": isDisabled,
      "hover:bg-neutral-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;

  return isDisabled ? (
    <div className={className}>
      <Icon className="size-4" />
    </div>
  ) : (
    <Link className={className} href={href}>
      <Icon className="size-4" />
    </Link>
  );
};

type PaginationNumberProps = {
  page: number | string;
  href: string;
  position?: "first" | "last" | "single" | "middle";
  isActive: boolean;
};

const PaginationNumber = ({
  page,
  href,
  position,
  isActive,
}: PaginationNumberProps) => {
  const className = cn(
    "flex size-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-primary border-primary text-white": isActive,
      "hover:bg-neutral-100": !isActive && position !== "middle",
      "text-neutral-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link className={className} href={href}>
      {page}
    </Link>
  );
};

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
