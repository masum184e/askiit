import { motion } from "framer-motion";
import Link from "next/link";

interface SplCardProps {
  title: string;
  link: string;
}

const SplCard = ({ title, link }: SplCardProps) => {
  return (
    <Link href={`/spls/${link}`}>
      <motion.div
        className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-10 flex items-center justify-center text-2xl font-bold hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.div>
    </Link>
  );
};

export default SplCard;
