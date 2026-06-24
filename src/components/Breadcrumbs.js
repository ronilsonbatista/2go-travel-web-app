import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from './JsonLd';
import { getBreadcrumbsSchema } from '@/lib/schema';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  // Prefix with Home route
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const schema = getBreadcrumbsSchema(breadcrumbItems);

  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 text-xs sm:text-sm text-text-muted select-none text-left">
      <JsonLd schema={schema} />
      <ol className="flex items-center gap-2 list-none m-0 p-0 flex-wrap">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-border-gray shrink-0" />}
              
              {isLast ? (
                <span className="font-semibold text-brand-navy truncate max-w-[160px] sm:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="hover:text-brand-orange transition-colors flex items-center gap-1 font-medium"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 shrink-0" />}
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
