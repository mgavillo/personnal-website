import React from "react";
import { motion } from "framer-motion";
import { Animations } from "./Animations";

export default function AnimatedLetters({ text }: { text: string }) {
  // splite words
  const splitWords = text.split(" ");

  // splite words to letters
  const words = splitWords.map((word) => {
    return word.split("");
  });

  //  adding spacing
  words.map((word) => {
    return word.push("\u00A0");
  });

  return (
    <motion.div variants={Animations.container} initial="hidden" animate="visible" className="overflow-hidden w-fit">
      {words.flat().map((element, index) => {
        return (
          <motion.span
            className="inline-block mt-3 text-white transition duration-500"
            variants={Animations.letter}
            key={index}>
            {element}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
