import Image from "next/image";
import Hello from "./home/01_hello/Hello";
import Whoami from "./home/02_whoami/Whoami";
import Dual3D from "./home/04_dual3D/Dual3D";
import Waves3 from "@/components/backgrounds/Waves3";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between h-fit overflow-hidden gap-56 snap-y">

      <div className="-z-40 absolute right-0 -scale-x-100 bg-dark-blue" style={{height: "300vh", width:"calc(0.66 * 300vh)", top: "100vh"}}>
        <Waves3 className=""/>
        {/* <div className=" absolute bg-gradient-to-b from-dark-blue via-dark-blue/20 to-transparent inset-0" /> */}
      </div>
      <Hello />
      <Whoami />
      {/* <Dual3D /> */}
    </main>
  );
}
