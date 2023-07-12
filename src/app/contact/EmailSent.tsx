import Image from "next/image";
import gif from "/public/logo.gif"
export default function EmailSent() {
  return (
    <div className="w-full flex h-full items-center justify-center flex-col gap-2 ">
      <Image
        alt="gif of an eye blicking "
        className="drop-shadow-[0_35px_35px_rgba(0,1,0,0.25)]"
        src={gif}
        width={200}
        height={200}
/>
      <h1 className="text-5xl  filter drop-shadow-md shadow-rose-600">Your message has been sent.</h1>
      <h3 className="text-white/60">
        Thank you for reaching out, I will come back to you soon!{" "}
      </h3>
    </div>
  );
}
