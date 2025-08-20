"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Step1InvitationProps = {
  onYes: () => void;
  onNo: () => void;
};

export default function Step1Invitation({ onYes, onNo }: Step1InvitationProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 lg:gap-2 md:px-0 px-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      {/* Logo */}
      <motion.div
        className="inline-flex max-w-max items-center relative px-4 md:px-0 -left-4 lg:-left-2"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Image
          src="/logo-finnegans.png"
          alt="Finnegans Logo"
          width={400}
          height={400}
          className="rounded-full h-[80px] w-auto relative -top-3 -left-4"
          priority
        />
      </motion.div>

      {/* Title */}

      <motion.h1
        className="lg:text-[62px]  text-4xl md:text-4xl leading-10 md:leading-none px-4 md:px-0  font-medium text-[#4bc3fe] lg:mb-10 text-shadow-xs text-left w-full relative lg:left-0 -left-4"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <p className="text-white font-medium text-xl whitespace-nowrap md:text-3xl relative lg:bottom-0 bottom-3">
          Lo que viene, primero con vos.
        </p>{" "}
        Pre-lanzamiento <br /> Espacio <br className="" /> Finnegans CC{" "}
        <span className="text-white">¿Venís?</span>
      </motion.h1>

      {/* Buttons */}
      <motion.div
        className="flex items-center justify-around md:justify-start gap-2 md:gap-6  relative top-4 md:top-0"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="border-[#4bc3fe]/60 whitespace-nowrap border-2 border-t-0 border-b-0 cursor-pointer font-medium text-lg md:text-4xl py-3 px-6 rounded-full bg-[#4bc3fe]/40 backdrop-blur-md text-white shadow-lg"
        >
          Obvio que si!
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNo}
          className="border-[#4bc3fe]/60 whitespace-nowrap border-2 border-t-0 border-b-0 cursor-pointer font-medium text-lg md:text-4xl py-3 px-6 rounded-full bg-[#4bc3fe]/40 backdrop-blur-md text-white shadow-lg"
        >
          No puedo :(
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
