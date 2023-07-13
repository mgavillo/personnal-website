import { Suspense } from "react";
import Waves from "./Waves";
export default function Hello() {
  return (
    <section className="w-full h-screen relative  mt-0">
      <Suspense fallback="">
        <Waves />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-dark-blue to-transparent -mb-48 z-40 pointer-events-none h-96"></div>
    </section>
  );
}
