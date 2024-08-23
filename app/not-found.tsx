import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <div className="flex items-center justify-center min-h-[79vh]">
        <div className="flex flex-col items-center gap-[40px]">
          <span className="text-[150px] font-bold text-errorText">404</span>
          <span className="text-[60px] font-bold  text-errorText">
            Ooops... We cannot find this page
          </span>
          <Link
            href="/"
            className="bg-errorButton text-white p-5 rounded font-medium hover:bg-[#fbc511] hover:text-black transition-colors duration-200"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
