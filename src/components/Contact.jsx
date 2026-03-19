import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ExternalLink, MapPin } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'usamaahmed@arizona.edu',
    href: 'mailto:usamaahmed@arizona.edu',
    color: '#4F8EF7',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/usamaahmedsh',
    href: 'https://github.com/usamaahmedsh',
    color: '#8B5CF6',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/usamaahmedsh',
    href: 'https://linkedin.com/in/usamaahmedsh',
    color: '#4F8EF7',
  },
  {
    icon: ExternalLink,
    label: 'HuggingFace',
    value: 'huggingface.co/usamaahmedsh',
    href: 'https://huggingface.co/usamaahmedsh',
    color: '#F59E0B',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">05</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#F0F4FF]">Contact</h2>
          <div className="flex-1 h-px bg-navy-700 ml-2" />
        </motion.div>

        <div className="max-w-3xl grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-[#F0F4FF] mb-3">
              Get in touch
            </h3>
            <p className="text-[#8899BB] text-sm leading-relaxed mb-4">
              I'm always interested in discussing ML research, data pipelines,
              or interesting problems in AI and retrieval systems. Feel free to
              reach out through any of the channels below.
            </p>
            <p className="text-[#8899BB] text-sm leading-relaxed mb-6">
              My work spans synthetic data generation, information retrieval,
              financial AI, and production ML systems. Happy to chat about
              any of it.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#8899BB]">
              <MapPin size={14} className="text-accent-blue" />
              Seattle, WA
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            {links.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-navy-900 border border-navy-700 hover:border-accent-blue/30 transition-all duration-200 group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#8899BB]/60 font-mono uppercase tracking-widest mb-0.5">
                    {label}
                  </div>
                  <div className="text-sm text-[#F0F4FF] truncate group-hover:text-accent-blue transition-colors">
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-8 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="font-mono text-xs text-[#8899BB]/40">
            © 2026 Usama Ahmed
          </span>
          <span className="font-mono text-xs text-[#8899BB]/40">
            Built with React · Tailwind · Framer Motion
          </span>
        </motion.div>
      </div>
    </section>
  )
}
