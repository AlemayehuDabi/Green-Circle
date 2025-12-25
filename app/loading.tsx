'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      
      {/* Fast, crisp rotating ring */}
      <motion.div
        className="w-14 h-14 rounded-full border-4 border-gray-300 border-t-gray-800"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 0.7,  // Fast and snappy
        }}
      />

      {/* Smooth fade text */}
      <motion.p
        className="mt-4 text-gray-600 font-medium text-base"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
