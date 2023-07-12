"use client";
import Waves1 from "@/components/backgrounds/Waves1";
import { useState } from "react";
import EmailSent from "./EmailSent";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [sent, setSent] = useState<boolean>(true);

  return (
    <div className="w-full h-screen  relative overflow-hidden pb-1">
      {!sent && <ContactForm setSent={setSent}/>}
      {sent && <EmailSent />}
      <div className="absolute ml-72 -mt-80  inset-0 -z-10 ">
        <Waves1 className=" -rotate-90" style={{ height: "100vw" }} />
      </div>
    </div>
  );
}
