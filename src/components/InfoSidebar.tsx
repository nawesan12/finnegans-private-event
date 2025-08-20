"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type InfoSidebarProps = {
  horizontal?: boolean; // new prop
};

export default function InfoSidebar({ horizontal = false }: InfoSidebarProps) {
  const items = [
    { icon: "/boton-lateral-1.png", label: "4 de Septiembre" },
    { icon: "/boton-lateral-2.png", label: "18:30hs" },
    {
      icon: "/boton-lateral-3.png",
      label: "Santos Dumont 4080",
      href: "https://www.google.com/maps/place/Santos+Dumont+4080,+C1427EIN+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5889014,-58.4525789,17z",
    },
  ];

  const IconBlock = ({ icon, label }: { icon: string; label: string }) => (
    <div className="group relative">
      <div className=" flex items-center justify-center rounded-2xl  text-[#4bc3fe]  transition-all transform ">
        <Image
          src={icon}
          alt={`${label} icon`}
          width={100}
          height={100}
          className="w-24 h-24 md:w-28 md:h-28"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-2 rounded-lg bg-white shadow-lg text-gray-800 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );

  return horizontal ? (
    // Horizontal row version for Step 1
    <div className="flex justify-around gap-6 mt-16 md:hidden">
      {items.map((item, index) => {
        const content = (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <IconBlock icon={item.icon} label={item.label} />
          </motion.div>
        );

        return item.href ? (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        );
      })}
    </div>
  ) : (
    // Original vertical sidebar for desktop
    <div className="hidden md:flex items-center h-full">
      <aside className="relative flex flex-col gap-4 z-20 justify-center h-full">
        {items.map((item, index) => {
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <IconBlock icon={item.icon} label={item.label} />
            </motion.div>
          );

          return item.href ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </aside>
    </div>
  );
}
