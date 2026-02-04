import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
      <div className="aspect-[3/4] bg-white/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-2 bg-white/5 w-20 rounded" />
          <div className="h-6 bg-white/10 w-4/5 rounded" />
        </div>
        <div className="h-2 bg-white/5 w-24 rounded" />
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({ className = '', width = '100%' }) {
  return (
    <div className={`h-4 bg-white/5 rounded ${className}`} style={{ width }} />
  );
}
