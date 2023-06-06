import Link from "next/link";

export default function Header() {

  return (
    <header className="w-screen h-16 text-2xl fixed z-50 backdrop-blur-lg bg-dark-blue/50 flex items-center justify-center gap-12">
      <Link href="/">Home</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/contact">Contact</Link>
    </header>
  );
}
