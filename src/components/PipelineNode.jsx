import { motion, AnimatePresence } from 'framer-motion'
import { Github, X, ChevronRight, TrendingUp } from 'lucide-react'

export function PipelineNode({ node, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer group h-full"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ background: `${node.color}18` }}
      />

      <div
        className={`relative rounded-xl border p-5 transition-all duration-300 h-full flex flex-col ${
          isSelected ? 'bg-navy-800' : 'border-navy-700 bg-navy-900 hover:bg-navy-800/80'
        }`}
        style={{
          borderColor: isSelected ? node.color : undefined,
          boxShadow: isSelected ? `0 0 24px ${node.color}22` : undefined,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${node.color}, transparent)`,
            opacity: isSelected ? 1 : 0.4,
          }}
        />

        {/* Header */}
        <div className="mb-3">
          <div
            className="text-xs font-mono tracking-widest uppercase mb-1.5"
            style={{ color: node.color }}
          >
            {node.subtitle}
          </div>
          <h3 className="text-[#F0F4FF] font-semibold text-sm leading-snug">
            {node.title}
          </h3>
        </div>

        <p className="text-xs text-[#8899BB] leading-relaxed mb-4 flex-1 line-clamp-3">
          {node.description}
        </p>

        {/* Key metrics — 2×2 grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {node.metrics.slice(0, 4).map((m) => (
            <div
              key={m.label}
              className="rounded-lg p-2 border"
              style={{ background: `${node.color}08`, borderColor: `${node.color}20` }}
            >
              <div
                className="text-sm font-bold font-mono leading-none mb-0.5"
                style={{ color: node.color }}
              >
                {m.value}
              </div>
              <div className="text-[10px] text-[#8899BB]/70 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* I/O */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8899BB]/40 font-mono w-6 shrink-0 text-right">IN</span>
            <span className="font-mono text-[#8899BB] bg-navy-950/60 px-2 py-0.5 rounded text-xs truncate border border-navy-700/50">
              {node.input}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8899BB]/40 font-mono w-6 shrink-0 text-right">OUT</span>
            <span
              className="font-mono px-2 py-0.5 rounded text-xs truncate border"
              style={{ color: node.color, background: `${node.color}10`, borderColor: `${node.color}25` }}
            >
              {node.output}
            </span>
          </div>
        </div>

        <div
          className="flex items-center gap-1 text-xs font-medium mt-auto"
          style={{ color: node.color }}
        >
          <span>{isSelected ? 'Collapse' : 'Explore details'}</span>
          <motion.div
            animate={{ rotate: isSelected ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={12} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function PipelineArrow({ color = '#4F8EF7' }) {
  return (
    <div className="hidden md:flex items-center justify-center px-1 shrink-0 self-center mt-[-40px]">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ originX: 0 }}
        className="flex items-center gap-0.5"
      >
        {/* Animated dashed line */}
        <div className="relative w-10 h-px overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          />
          <motion.div
            className="absolute top-0 w-4 h-full opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, white, transparent)` }}
            animate={{ x: [-16, 40] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <svg width="6" height="10" viewBox="0 0 6 10">
          <path d="M6 5L0 0v10z" fill={color} />
        </svg>
      </motion.div>
    </div>
  )
}

export function MobileArrow({ color }) {
  return (
    <div className="flex md:hidden justify-center py-2">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-0.5"
        style={{ originY: 0 }}
      >
        <div className="w-px h-6" style={{ background: `linear-gradient(${color}, transparent)` }} />
        <svg width="10" height="6" viewBox="0 0 10 6">
          <path d="M5 6L0 0h10z" fill={color} />
        </svg>
      </motion.div>
    </div>
  )
}

export function NodeDetailPanel({ node, onClose }) {
  if (!node) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div
          className="mt-4 rounded-xl border bg-navy-900 overflow-hidden"
          style={{ borderColor: `${node.color}35` }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 flex items-start justify-between border-b"
            style={{
              background: `linear-gradient(135deg, ${node.color}12, transparent)`,
              borderColor: `${node.color}20`,
            }}
          >
            <div>
              <div
                className="text-xs font-mono tracking-widest uppercase mb-1"
                style={{ color: node.color }}
              >
                {node.subtitle}
              </div>
              <h3 className="text-[#F0F4FF] font-semibold text-lg">{node.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#8899BB] hover:text-[#F0F4FF] transition-colors mt-1 p-1 rounded hover:bg-white/5"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6">
            {/* Full metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {node.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg p-3 border text-center"
                  style={{ background: `${node.color}08`, borderColor: `${node.color}25` }}
                >
                  <div
                    className="text-xl font-bold font-mono mb-0.5"
                    style={{ color: node.color }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-[#8899BB] font-medium mb-0.5">{m.label}</div>
                  <div className="text-[10px] text-[#8899BB]/50">{m.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <p className="text-[#8899BB] text-sm leading-relaxed mb-5">{node.details}</p>

            {/* I/O */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-navy-950/60 rounded-lg p-3 border border-navy-700">
                <div className="text-xs text-[#8899BB]/50 mb-1 font-mono uppercase tracking-widest">Input</div>
                <div className="text-sm text-[#F0F4FF] font-mono">{node.input}</div>
              </div>
              <div className="rounded-lg p-3 border" style={{ background: `${node.color}06`, borderColor: `${node.color}25` }}>
                <div className="text-xs text-[#8899BB]/50 mb-1 font-mono uppercase tracking-widest">Output</div>
                <div className="text-sm font-mono" style={{ color: node.color }}>{node.output}</div>
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-5">
              <div className="text-xs font-mono text-[#8899BB]/50 uppercase tracking-widest mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {node.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded border font-mono"
                    style={{ color: node.color, borderColor: `${node.color}30`, background: `${node.color}08` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={node.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-all duration-200 hover:bg-white/5 font-medium"
              style={{ color: node.color, borderColor: `${node.color}40` }}
            >
              <Github size={15} />
              View on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
