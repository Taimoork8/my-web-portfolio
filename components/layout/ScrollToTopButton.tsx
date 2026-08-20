"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-[#111113]/90 border border-white/10 text-white/60 backdrop-blur-md shadow-xl hover:border-[#C6F432]/40 hover:text-[#C6F432] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4.5 h-4.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
