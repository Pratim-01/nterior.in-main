import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-[#777] sm:text-[14px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-[#CF0006]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-[#111]" : ""}>{item.label}</span>
            )}
            {!isLast && <span className="text-[#bbb]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
