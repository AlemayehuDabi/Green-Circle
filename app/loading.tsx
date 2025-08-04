'use client';

import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <ClipLoader color="#16a34a" size={60} speedMultiplier={1.5} />
        <p className="mt-4 text-green-700 font-semibold text-lg animate-pulse">
          Loading, please wait...
        </p>
      </motion.div>
    </div>
  );
}
