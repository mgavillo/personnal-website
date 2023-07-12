import { ReactNode } from "react";

export default function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <div className="relative group w-fit h-fit">
      {children}
      <span
        className="group-hover:opacity-100 transition-opacity bg-black px-2 py-1 text-gray-100 rounded-md absolute left-1/2 -top-6 pointer-events-none
    -translate-x-1/2 opacity-0 m-4 mx-auto -translate-y-full z-40
            after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-black">
        {text}
      </span>
    </div>
  );
}
