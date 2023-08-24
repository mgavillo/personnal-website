import { Suspense } from "react";
import dynamic from "next/dynamic";
const SpaceBg = dynamic(() => import("./SpaceBg"), { ssr: false });

export default function Hello() {
  return (
    <section className="p-0 relative overflow-hidden">
      <Suspense fallback="">
        <SpaceBg />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-b from-transparent via-dark-blue to-transparent -mb-48 pointer-events-none h-96"></div>
    </section>
  );
}
