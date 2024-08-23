import Link from 'next/link';

export default function Page() {
  return (
    <main className="bg-light">
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
