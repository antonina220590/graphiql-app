import Link from 'next/link';

export default function HistoryBtn() {
  return (
    <Link href="/history">
      <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
        History
      </button>
    </Link>
  );
}
