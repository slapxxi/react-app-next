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
      <Link as="posts/greetings" href="/post?title=greetings">
        <a>Post</a>
      </Link>
    </div>
  );
}

export default Header;
