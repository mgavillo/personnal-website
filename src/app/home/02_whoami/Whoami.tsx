import Infos from "./Infos";

export default function Whoami() {
  return (
    <section className="w-full h-screen ">
      <h2 className="">whoami ?</h2>
      <h3 className="mb-8">My name is Marie</h3>
      <div className="flex flex-row justify-around">
        <div id="character-wraper">
            <div id="character-container" className="h-[550px] w-[450px] rounded-md bg-gradient-to-tr from-neon-pink to-blue border-1 border-blue p-1 shadow-box shadow-blue">
                <div className="bg-black w-full h-full"/>
            </div>
        </div>
        <Infos />
      </div>
    </section>
  );
}
