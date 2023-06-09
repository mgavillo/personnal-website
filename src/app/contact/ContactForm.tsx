
import {TextArea, Input} from "@/components/inputs";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";


export default function ContactForm({setSent}: {setSent: any}) {
    const categories = ["Design", "Web development", "Deployment"];
    const [selected, setSelected] = useState<boolean[]>(
      new Array(categories.length).fill(false)
    );
    const formRef = useRef<HTMLFormElement>(null);
    function changeSelection(index: number) {
      let array = [...selected];
      array[index] = !array[index];
      setSelected(array);
    }
  
    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            setSent(true)
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
    
  return (
    <form
      ref={formRef}
      className=" flex flex-col gap-4 w-3/5 h-full bg-dark-blue/10 justify-around items-center p-24 pt-28 backdrop-blur-lg"
      onSubmit={(e) => sendEmail(e)}
    >
      <div className="w-full">
        <h2 className=" text-4xl">Have a project ?</h2>
        <h1 className="mb-12 text-7xl">Contact me</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="">I'm interested in... </h3>
        <div className="flex flex-row gap-2">
          {categories.map((el, i) => (
            <div
              onClick={() => changeSelection(i)}
              className={`relative bg-dark-blue border border-white/10 rounded-md text-center cursor-pointer hover:bg-transparent flex items-center justify-center px-4 py-2 hover:bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/30 ${
                selected[i]
                  ? "bg-gradient-to-r from-blue/60 to-neon-blue/60"
                  : "text-gray-400"
              }`}
            >
              {el}
              <input
                id={el}
                type="checkbox"
                checked={selected[i]}
                className=" hidden"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <Input
            className="w-fill"
            type="name"
            label="Name"
            placeHolder=""
            name="user_name"
          />
          <Input
            className="w-fill"
            type="email"
            label="Email address"
            placeHolder=""
            name="user_email"
          />
          <TextArea
            label="Tell me more about it"
            placeHolder=""
            name="details"
          />
          <div className="w-full flex flex-col items-center"></div>
        </div>
      </div>
      <button
        type="submit"
        className=" text-xl font-semibold px-4 py-3 rounded-md border border-white/10 w-fit bg-black hover:shadow-box-xs"
      >
        Submit
      </button>
    </form>
  );
}
