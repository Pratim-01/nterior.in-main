"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  {
    name: "Plywood",
    slug: "plywood",
  },
  {
    name: "Blockboards",
    slug: "blockboards",
  },
  // {
  //   name: "Flexible Ply",
  //   slug: "flexible-ply",
  // },
];

export default function CategoryTabs() {
  const pathname = usePathname();

  return (
    <div
      className="
        mb-6
        flex
        gap-2
        overflow-x-auto
        border-b
        border-gray-200
        pb-4

        sm:gap-3
      "
    >
      {categories.map((category) => {
        const href =
          `/products/items/plywood-blockboards/${category.slug}`;

        const active =
          pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`
              shrink-0
              rounded-full
              border
              px-5
              py-2

              text-[13px]
              font-semibold

              transition-all
              duration-200

              sm:px-6
              sm:py-2.5
              sm:text-sm

              ${
                active
                  ? `
                    border-[rgb(207,0,6)]
                    bg-[rgb(207,0,6)]
                    text-white
                    shadow-sm
                  `
                  : `
                    border-gray-200
                    bg-white
                    text-gray-700
                    hover:border-[rgb(207,0,6)]
                    hover:text-[rgb(207,0,6)]
                  `
              }
            `}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}