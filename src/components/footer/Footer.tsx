import {
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="footer relative h-40 shadow-box-xs">
      <div className="absolute inset-0 flex flex-row px-24 justify-between z-50 py-12 bg-blue/50">
        <div>
          <p>Made with 💕 by Marie</p>
          <p>Copyright © 2023 - MIT License</p>
        </div>
        <div className="flex flex-row gap-3">
          <SiReact size={20} />
          <SiTailwindcss size={20} />
          <SiNextdotjs size={20} />
          <SiVercel size={20} />
          <SiThreedotjs size={20} />
          <SiSupabase size={20} />
        </div>
      </div>
    </footer>
  );
}
