import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function HistoryBtn() {
  const { t } = useTranslation();
  return (
    <Link href="/history">
      <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 transition duration-300 ease">
        {t('history.history')}

      </button>
    </Link>
  );
}
