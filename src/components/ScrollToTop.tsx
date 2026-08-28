import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-cream-50 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-espresso-700"
        >
          <ArrowUp size={16} strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
