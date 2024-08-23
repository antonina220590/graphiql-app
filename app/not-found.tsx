import Image from 'next/image';
export default function NotFound() {
  return (
    <main>
      <div>
        <Image
          src="/404.png"
          alt="page not found"
          role="presentation"
          width={100}
          height={80}
        />
      </div>
    </main>
  );
}
