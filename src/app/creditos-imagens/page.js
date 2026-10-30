import Link from 'next/link';
import sources from '../../../docs/curadoria-2026-10-29/sources.json';

export const metadata = { title: 'Créditos de imagens | 2GO', description: 'Autores, fontes e licenças das fotos dos guias 2GO.' };

export default function ImageCredits() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-brand-navy">
      <Link href="/guias" className="underline">Voltar aos guias</Link>
      <h1 className="my-6 text-3xl font-bold">Créditos de imagens</h1>
      <p className="mb-8">Fotografias selecionadas para os guias e destinos 2GO. As imagens foram redimensionadas e comprimidas para a web; o enquadramento pode variar conforme a tela.</p>
      <ul className="space-y-5">
        {Object.entries(sources).sort(([a], [b]) => a.localeCompare(b)).map(([key, photo]) => (
          <li key={key} className="border-b border-slate-200 pb-4 text-sm">
            <p className="font-bold">{photo.title.replace(/^File:/, '')}</p>
            <p>{photo.author}</p>
            <p><a className="underline" href={photo.source}>Arquivo original e autoria</a>{' · '}<a className="underline" href={photo.licenseUrl || photo.source}>{photo.license}</a></p>
          </li>
        ))}
      </ul>
    </main>
  );
}
