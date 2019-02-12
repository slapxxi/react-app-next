import Header from '@self/components/Header';
import Link from 'next/link';

function Index() {
  return (
    <div>
      <Header />
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export default Index;
