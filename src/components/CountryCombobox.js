'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { normalizeSearch } from '@/lib/guiasDestinations';

/**
 * Accessible searchable country combobox for /guias/destinos.
 */
export default function CountryCombobox({
  countries = [],
  value = null,
  onChange,
  placeholder = 'Buscar país…',
  className = ''
}) {
  const listId = useId();
  const inputId = useId();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query.trim());
    if (!q) return countries;
    return countries.filter((country) => normalizeSearch(country).includes(q));
  }, [countries, query]);

  const options = useMemo(
    () => [{ value: null, label: 'Todos os países' }, ...filtered.map((c) => ({ value: c, label: c }))],
    [filtered]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open, countries]);

  const select = (next) => {
    onChange?.(next);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (event) => {
    if (!open && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      setQuery('');
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const option = options[highlight];
      if (option) select(option.value);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        País
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          value={open ? query : (value || '')}
          placeholder={value || placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-full border border-border-gray/80 bg-white py-2.5 pl-10 pr-16 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
          {value ? (
            <button
              type="button"
              aria-label="Limpar país"
              onClick={() => select(null)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-navy/60 hover:bg-[#F7F8FA] hover:text-brand-orange"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
          <button
            type="button"
            aria-label={open ? 'Fechar lista de países' : 'Abrir lista de países'}
            onClick={() => {
              setOpen((current) => !current);
              if (!open) inputRef.current?.focus();
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-navy/60 hover:bg-[#F7F8FA] hover:text-brand-orange"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-border-gray/70 bg-white py-1 shadow-lg"
        >
          {options.length === 0 ? (
            <li className="px-4 py-3 text-sm text-text-muted">Nenhum país encontrado</li>
          ) : (
            options.map((option, index) => {
              const selected = option.value === value || (!option.value && !value);
              const active = index === highlight;
              return (
                <li key={option.value ?? '__all__'} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => select(option.value)}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm ${
                      active ? 'bg-[#F7F8FA]' : ''
                    } ${selected ? 'font-extrabold text-brand-navy' : 'text-brand-navy/90'}`}
                  >
                    <span>{option.label}</span>
                    {selected ? <Check className="h-4 w-4 text-brand-orange" /> : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
