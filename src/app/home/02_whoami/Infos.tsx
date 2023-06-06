import Skill from "./Skill";
import { skills } from "./skills";

function Category({ text }: { text: string }) {
  return (
    <div
      className="flex items-center justify-center w-32 bg-blue p-3 cursor-pointer -mr-3 select-none hover:mix-blend-hard-light"
      style={{ clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" }}
    >
      <h3>{text}</h3>
    </div>
  );
}

export default function Infos() {
  return (
    <div className="w-2/5 min-w-[150px] flex flex-col justify-start h-full pt-28 gap-12">
      <div id="categories" className="flex flex-row justify-start items-start">
        <Category text="code" />
        <Category text="2D" />
        <Category text="3D" />
      </div>
      
      <div className="flex flex-col gap-4">
        {skills[0].map((el, i) => (
          <Skill name={el.text} percentage={el.percent} />
        ))}
      </div>
    </div>
  );
}
