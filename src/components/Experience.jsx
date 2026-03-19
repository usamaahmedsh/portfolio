import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { industryExperience, researchExperience } from '../data/projects'

function ExperienceCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-navy-700" />
      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-accent-blue ring-2 ring-navy-950 ring-offset-1 ring-offset-navy-950" />

      <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-[#F0F4FF] font-semibold text-base group-hover:text-accent-blue transition-colors">
              {item.role}
            </h3>
            <p className="text-accent-blue text-sm mt-0.5">{item.org}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono text-[#8899BB] bg-navy-800 px-2.5 py-1 rounded border border-navy-700">
              {item.period}
            </span>
            <p className="text-xs text-[#8899BB]/60 mt-1">{item.location}</p>
          </div>
        </div>

        <ul className="space-y-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="text-sm text-[#8899BB] leading-relaxed flex gap-3">
              <span className="text-accent-blue/50 mt-1.5 shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-navy-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">02</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#F0F4FF]">Experience</h2>
          <div className="flex-1 h-px bg-navy-700 ml-2" />
        </motion.div>

        <div className="max-w-3xl">
          <h3 className="text-sm font-mono text-accent-blue tracking-widest uppercase mb-6">
            Industry &amp; Internships
          </h3>
          {industryExperience.map((item, i) => (
            <ExperienceCard key={item.org + item.role} item={item} index={i} />
          ))}

          <h3 className="text-sm font-mono text-accent-blue tracking-widest uppercase mb-6 mt-4">
            Research &amp; Teaching
          </h3>
          {researchExperience.map((item, i) => (
            <ExperienceCard key={item.org + item.role} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
