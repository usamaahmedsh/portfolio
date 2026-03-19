import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, ExternalLink, Mail, ChevronDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

function Avatar() {
  const [imgError, setImgError] = useState(false)

  if (!imgError) {
    return (
      <img
        src="/portfolio/profile.jpg"
        alt="Usama Ahmed"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    )
  }

  // Fallback: stylized initials
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span
        className="text-4xl font-bold tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #4F8EF7 0%, #00D4FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        UA
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,142,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #4F8EF7 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          <div className="relative">
            <div
              className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-accent-blue/30 bg-navy-800"
              style={{ boxShadow: '0 0 60px rgba(79,142,247,0.25)' }}
            >
              <Avatar />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 border-2 border-navy-950" />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="text-center md:text-left">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-[#F0F4FF]"
          >
            Usama Ahmed
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="mb-6">
            <span className="text-xl md:text-2xl font-light text-gradient">
              Data Scientist
            </span>
            <span className="text-xl md:text-2xl font-light text-[#8899BB]">
              {' '}· Synthetic Data · Financial AI · Information Retrieval
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="text-[#8899BB] text-base md:text-lg max-w-2xl leading-relaxed mb-10"
          >
            I build end-to-end ML pipelines — from synthetic data generation and
            weak supervision to model training and production deployment.
            MS Data Science, University of Arizona (Presidential Scholar).
            Previously at Pi Labs and Afiniti Software Solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-accent-blue text-white font-medium text-sm hover:bg-blue-500 transition-all duration-200 glow-blue"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-navy-700 text-[#F0F4FF] font-medium text-sm hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex items-center justify-center md:justify-start gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/usamaahmedsh', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/usamaahmedsh', label: 'LinkedIn' },
              { icon: ExternalLink, href: 'https://huggingface.co/usamaahmedsh', label: 'HuggingFace' },
              { icon: Mail, href: 'mailto:usamaahmed@arizona.edu', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#8899BB] hover:text-accent-blue transition-colors duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8899BB]/50"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
