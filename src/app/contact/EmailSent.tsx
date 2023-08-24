import Image from "next/image";
import gif from "/public/logo.gif"
export default function EmailSent() {
  return (
    <section className="items-center justify-center gap-4 ">
      <Image
        alt="gif of an eye blicking "
        className="drop-shadow-[0_35px_35px_rgba(0,1,0,0.25)] mb-12"
        src={gif}
        width={200}
        height={200}
/>
      <h1 className="filter drop-shadow-md shadow-rose-600">Your message has been sent.</h1>
      <h3 className="text-white/60">
        Thank you for reaching out, I will come back to you soon!{" "}
      </h3>
    </section>
  );
}
