import { Suspense } from "react";
import dynamic from "next/dynamic";
import TypedLetters from "@/components/TypedLetters";
const SpaceBg = dynamic(() => import("./SpaceBg"), { ssr: false });

const subTexts = [
  "write specifications",
  "design figma mocks",
  "develop your website",
  "conceive data structures",
  "manage databases",
  "host and deploy",
];


export default function Hello() {
  return (
    <section className="p-0 relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p>Hello, i'm Marie</p>
        <h1 className="h-32 md:h-64 text-center bg-gradient-radial from-white from-30% to-blue/5 text-white text-opacity-50 bg-clip-text text-3xl md:text-8xl">
          Developer and Designer
        </h1>
        <div className="text-left flex flex-row gap-x-2 gap-y-0 flex-wrap w-full justify-center">
          <h3>I can help you</h3>
          <h3>
            <TypedLetters
              texts={subTexts}
              className="bg-gradient-to-r from-neon-pink to-neon-blue text-white/25 bg-clip-text relative font-bold"
            />
          </h3>
        </div>
      </div>
      
      <Suspense fallback="">
        <SpaceBg />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-b from-transparent via-dark-blue to-transparent -mb-48 pointer-events-none h-96"></div>
    </section>
  );
}
