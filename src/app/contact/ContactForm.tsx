import { TextArea, Input } from "@/components/inputs";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionTitle from "@/components/SectionTitle";
import Selector from "@/components/buttons/Selector";

export default function ContactForm({ setSent }: { setSent: any }) {
  const categories = ["Design", "Web development", "Deployment"];
  const [selected, setSelected] = useState<boolean[]>(new Array(categories.length).fill(false));
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
          setSent(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <section className="py-24">
      <form
        ref={formRef}
        className=" flex flex-col gap-4 w-full md:w-3/5 h-full bg-dark-blue/10 justify-around items-center backdrop-blur-lg"
        onSubmit={(e) => sendEmail(e)}>
        <div className="w-full flex flex-col gap-3">
          <h3 className=" text-gray-400">Have a project ?</h3>
          <span className="mb-12">
            <SectionTitle text="Contact me" />
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="">I&apos;m interested in... </p>
          <div className="flex flex-row gap-2">
            {categories.map((el, i) => (
              <Selector key={i} onClick={() => changeSelection(i)} selected={selected[i]} content={el} />
            ))}
          </div>
          <div className="flex flex-col gap-3 md:gap-6 mt-4">
            <Input className="w-fill" type="name" label="Name" placeHolder="" name="user_name" />
            <Input className="w-fill" type="email" label="Email address" placeHolder="" name="user_email" />
            <TextArea label="Tell me more about it" placeHolder="" name="details" />
          </div>
        </div>
        <button
          type="submit"
          className=" text-xl font-semibold px-4 py-3 rounded-md border border-white/10 w-fit bg-black hover:shadow-box-xs">
          Submit
        </button>
      </form>
    </section>
  );
}
