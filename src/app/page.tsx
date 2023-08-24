import Hello from "./sections/01_hello/Hello";
import Whoami from "./sections/02_whoami/Whoami";
import Waves3 from "@/components/backgrounds/Waves3";
import Skills from "./sections/03_skills/Skills";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between h-fit overflow-hidden gap-2 md:gap-24">
      <Hello />
      <Whoami />
      <Skills />
      <div className="-z-20 absolute -right-32 md:right-0 -scale-x-100 w-[100vh] h-[300vh] top-[100vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-transparent to-dark-blue" />
          <Waves3 />
        </div>
      </div>
    </main>
  );
}
