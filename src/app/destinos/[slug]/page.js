import { redirect } from 'next/navigation';

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  redirect(`/roteiros?search=${slug}`);
}

