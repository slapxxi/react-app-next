import Link from 'next/link';

function Header() {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about" prefetch>
        <a>About</a>
      </Link>
      <Link href="/post?id=randomid">
        <a>Post</a>
      </Link>
    </div>
  );
}

export default Header;
