import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="面包屑导航" className={`text-sm ${className ?? "text-neutral-500"}`}>
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-neutral-700 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium" : undefined}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden className="text-neutral-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
