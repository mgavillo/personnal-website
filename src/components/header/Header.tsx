import Link from "next/link";
import { SiInstagram, SiTwitter } from "react-icons/si";

export default function Header() {
  return (
    <header className="w-screen h-16 text-2xl fixed z-50 backdrop-blur-lg bg-dark-blue/50 flex justify-between p-4">
      <div className="w-36"></div>
      <div className="flex flex-row gap-8 h-full items-center">
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="flex flex-row gap-4 h-full items-center w-36 justify-end">
        <div className="border border-transparent hover:border-white rounded-lg p-3 cursor-pointer">
          <SiInstagram size={25} className=""/>
        </div>
        <div className="border border-transparent hover:border-white rounded-lg p-3 cursor-pointer">
          <SiTwitter />
        </div>
      </div>
    </header>
  );
}
