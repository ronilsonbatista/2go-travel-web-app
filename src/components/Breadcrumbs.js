import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from './JsonLd';
import { getBreadcrumbsSchema } from '@/lib/schema';

export default function Breadcrumbs({ items = [], variant = 'default' }) {
  if (!items || items.length === 0) return null;

  const onDark = variant === 'onDark';

  // Prefix with Home route
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const schema = getBreadcrumbsSchema(breadcrumbItems);

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        onDark
          ? 'w-full text-xs font-semibold text-white/90 select-none text-left sm:text-sm'
          : 'w-full py-4 text-xs sm:text-sm text-text-muted select-none text-left'
      }
    >
      <JsonLd schema={schema} />
      <ol className="flex items-center gap-2 list-none m-0 p-0 flex-wrap">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                onDark
                  ? <span className="text-white/45" aria-hidden="true">/</span>
                  : <ChevronRight className="w-3.5 h-3.5 text-border-gray shrink-0" />
              )}
              
              {isLast ? (
                <span
                  className={
                    onDark
                      ? 'font-semibold text-white truncate max-w-[160px] sm:max-w-xs'
                      : 'font-semibold text-brand-navy truncate max-w-[160px] sm:max-w-xs'
                  }
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className={
                    onDark
                      ? 'hover:text-white transition-colors font-semibold'
                      : 'hover:text-brand-orange transition-colors flex items-center gap-1 font-medium'
                  }
                >
                  {index === 0 && !onDark && <Home className="w-3.5 h-3.5 shrink-0" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
