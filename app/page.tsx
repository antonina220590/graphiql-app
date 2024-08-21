import Link from 'next/link';

export default function Page() {
  return (
    <main className="bg-[#D9BCA9]">
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
