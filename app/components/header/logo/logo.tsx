import Link from 'next/link';

export default function Logo() {
  return (
    <h1 className="flex items-center">
      <Link
        href="/"
        className="inline-block text-white bg-contain bg-center transition-opacity duration-300 w-[11.9rem] h-[9.5rem]"
        style={{
          backgroundImage: "url('/logo.png')",
          textIndent: '-1234em',
          backgroundRepeat: 'no-repeat',
        }}
      >
        Pages
      </Link>
    </h1>
  );
}
