import Link from 'next/link';

import GithabIcon from '../../../public/github.svg';
import RSSLogo from '../../../public/rss.svg';

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="h-[13vh] p-5 flex justify-between items-center">
        <Link href="https://rs.school/courses/reactjs" target="_blank">
          <RSSLogo width="100" height="100" />
        </Link>
        <span className="text-light font-bold text-[45px]">2024</span>
        <div className="flex">
          <Link href="https://github.com/antonina220590" target="_blank">
            <GithabIcon width="55" height="55" fill="#efefe9" />
          </Link>
          <Link href="https://github.com/inafk" target="_blank">
            <GithabIcon width="55" height="55" fill="#efefe9" />
          </Link>
          <Link href="https://github.com/krkate" target="_blank">
            <GithabIcon width="55" height="55" fill="#efefe9" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
