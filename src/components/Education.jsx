import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { education } from '../data/projects'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-navy-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">04</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#F0F4FF]">Education</h2>
          <div className="flex-1 h-px bg-navy-700 ml-2" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-accent-blue/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0 group-hover:bg-accent-blue/15 transition-colors">
                  <GraduationCap size={18} className="text-accent-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F0F4FF] font-semibold text-sm leading-snug mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-accent-blue text-sm mb-0.5">{edu.school}</p>
                  <p className="text-xs text-[#8899BB]/60 mb-4">{edu.location}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#8899BB] bg-navy-800 px-2.5 py-1 rounded border border-navy-700">
                      {edu.period}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-yellow-400/80">
                      <Award size={12} />
                      <span>{edu.awards}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
