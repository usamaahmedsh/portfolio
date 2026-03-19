import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../data/projects'

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const highlights = [
  { value: '3+', label: 'Years of Experience' },
  { value: '2.17M', label: 'Query–Doc Pairs Generated' },
  { value: '$5M', label: 'Monthly Retention Uplift' },
  { value: '6.5×', label: 'Latency Improvement (vLLM)' },
]

export default function About() {
  return (
    <section id="about" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">01</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#F0F4FF]">About</h2>
            <div className="flex-1 h-px bg-navy-700 ml-2" />
          </div>
        </AnimatedSection>

        {/* Highlight stats */}
        <AnimatedSection className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center hover:border-accent-blue/30 transition-colors"
              >
                <div className="text-2xl font-bold text-gradient mb-1">{h.value}</div>
                <div className="text-xs text-[#8899BB]">{h.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <div className="space-y-4 text-[#8899BB] leading-relaxed">
              <p>
                I'm a Data Scientist with 3+ years of industry and research
                experience across telecom, fintech, and AI startups, combined
                with graduate research in machine learning at the University of Arizona.
              </p>
              <p>
                My work sits at the intersection of{' '}
                <span className="text-[#F0F4FF]">synthetic data generation</span>,{' '}
                <span className="text-[#F0F4FF]">information retrieval</span>, and{' '}
                <span className="text-[#F0F4FF]">financial AI</span>. I don't just
                train models — I build the full data flywheel: corpus synthesis,
                weak supervision pipelines, and end-to-end model development through
                to production deployment.
              </p>
              <p>
                Previously GenAI at Pi Labs (SF), Data Scientist II at Afiniti (D.C.),
                and DS Product Manager at CarFirst. I hold an MS in Data Science from
                U of Arizona (Presidential Scholar, Dean's Honor List) and a BS in
                Economics & Mathematics from LUMS.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Seattle, WA', 'MS Data Science — U of Arizona', 'Presidential Scholar'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-[#8899BB]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Skills grid */}
          <AnimatedSection>
            <div className="space-y-5">
              {skills.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div className="text-xs font-mono text-accent-blue tracking-widest uppercase mb-2">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded bg-navy-800 border border-navy-700 text-[#8899BB] hover:border-accent-blue/40 hover:text-[#F0F4FF] transition-all duration-200 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
