import Image from "next/image";
import Hello from "./home/01_hello/Hello";
import Whoami from "./home/02_whoami/Whoami";
import Dual3D from "./home/04_dual3D/Dual3D";
import Waves3 from "@/components/backgrounds/Waves3";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between h-fit overflow-hidden gap-24">

      <Hello />
      <Whoami />
      <div className="-z-10 absolute right-0 top-0 -scale-x-100 bg-dark-blue" style={{ height: "300vh", width: "100vh", top: "100vh"}}>
        <Waves3 />
      </div>
    </main>
  );
}
