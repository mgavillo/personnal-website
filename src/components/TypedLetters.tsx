import { useEffect, useRef, useState } from "react";

export default function TypedLetters({
  texts,
  typeSpeed = 60,
  deleteSpeed = 40,
  changeTextDelay = 3500,
  className,
}: {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  changeTextDelay?: number;
  className?: string;
}) {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const helloTimer = useRef(0);

  useEffect(() => {
    setTypedText("");
    // setTextIndex(0);
    let currentTypedIndex = 0;
    let isDeleting = false;
    let timeoutId;
    let textIndex = 0;
    let text = texts[textIndex];
    let _typedText = "";
    const typeNextCharacter = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (isDeleting) {
        _typedText = _typedText.slice(0, -1);
        setTypedText(_typedText);
      } else {
        _typedText = _typedText + text[currentTypedIndex];
        setTypedText(_typedText);
        currentTypedIndex++;
      }

      if (isDeleting && _typedText === "") {
        isDeleting = false;
        currentTypedIndex = 0;
        textIndex = (textIndex + 1) % texts.length;
        text = texts[textIndex];
      } else if (!isDeleting && _typedText == text) {
        isDeleting = true;
        timeoutId = setTimeout(typeNextCharacter, changeTextDelay);
        return;
      }
      timeoutId = setTimeout(typeNextCharacter, isDeleting ? deleteSpeed : typeSpeed);
    };

    const timeout = setTimeout(() => {
      helloTimer.current = 1;
    }, 2000);
    typeNextCharacter();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="flex flex-row">
      <p className={className}>{typedText + " "}</p>
      <p className=" animate-blinking">|</p>
    </div>
  );
}
