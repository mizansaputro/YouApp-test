"use client";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  index: number;
}

const BoxAnimate: FC<Props> = ({ children, index }) => {
  const duration = (index + 1) / 2;
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: duration > 2 ? 2 : duration }}
    >
      {children}
    </motion.div>
  );
};

export default BoxAnimate;
