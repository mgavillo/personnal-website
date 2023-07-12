import { motion } from "framer-motion"

export default function HoveredSelector({hovered}: {hovered: boolean}){
    return(
        <>
        {hovered && (
            <motion.div
              layoutId="hovered"
              className="hovered absolute inset-0 border border-white/10 bg-gradient-to-r  from-dark-blue to-blue rounded-md -z-20"
            />
          )}
        </>
    )
}