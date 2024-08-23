import Link from 'next/link';

export default function Page() {
  return (
    <main className="bg-light flex flex-col items-center justify-center">
      <h1>Welcome!</h1>
      <div className="flex gap-4 mt-4 justify-center">
        <Link href="/signIn">
          <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition duration-300 ease">
            Sign in
          </button>
        </Link>
        <Link href="/signUp">
          <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
            Sign up
          </button>
        </Link>
      </div>
    </main>
  );
}
