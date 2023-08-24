"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import useOnScreen from "@/lib/useOnScreen";
import SectionTitle from "@/components/SectionTitle";
const CanvasWrapper = dynamic(() => import("./Canvas"), { ssr: false });

export default function Whoami() {
  const sectionRef = useRef(null);
  const isOnScreen = useOnScreen(sectionRef);

  return (
    <section className="items-start flex-col md:flex-row justify-around" ref={sectionRef}>
      {/* <div className="flex flex-row justify-around"> */}
      <Suspense fallback="">
        <CanvasWrapper />
      </Suspense>
      <div className="flex flex-col w-full md:w-2/5 min-w-[270px] gap-8 h-full justify-center text-lg">
        <SectionTitle text="About me" />
        {/* <p>
          I love to be creative and learn new things: web dev, but also : AI , Graphic design, Crypto, 3D, ecology,
          sociology, economics.{" "}
        </p> */}
        <p className=" text-base md:text-2xl">
          I come from the{" "}
          <a href="https://42.fr/en/homepage/" target="_blank" className=" font-bold italic ">
            42 school
          </a>
          . There, I learned that aesthetics matter as much as functionality
        </p>
        <ul className="pl-8 list-disc flex flex-col gap-2 text-gray-300 font-light text-xs md:text-base">
          <li>
            While doing <span className="font-bold text-white">games in C</span>, I would spend time doing a ASCII art
            HUD, add trippy animations, take care of creating a good game experience.
          </li>
          <li>
            When I developed an <span className="font-bold text-white">AI assistant</span>, I was thrilled to create a
            chatbot persona around it.
          </li>
          <li>
            When I did <span className="font-bold text-white">embedded systems</span>, we created a pretty funny satanic
            drinking game which was a whole experience : with music, engraved PCB, leds everywhere.
          </li>
          <li>
            That&apos;s why after school I pretty naturally learned more about{" "}
            <span className="font-bold text-white">graphic design</span>,{" "}
            <span className="font-bold text-white">ui design</span> and <span className="font-bold text-white">3D</span>
            , so I could mix both code and visual creativity.
          </li>
        </ul>
        <p></p>
        <p>
          Hard work and kindness are my core values. I&apos;m an optimist at heart, dedicated to projects that can drive real
          societal change, hence my love for ecology, blockchain, AI for good, open source.
        </p>
      </div>
      {/* </div> */}
    </section>
  );
}
