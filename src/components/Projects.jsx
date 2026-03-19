import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, TrendingUp, Database, Brain, Search } from 'lucide-react'
import { financialPipeline, irPipeline, otherProjects } from '../data/projects'
import { PipelineNode, PipelineArrow, MobileArrow, NodeDetailPanel } from './PipelineNode'

const clusterStats = {
  financial: [
    { icon: Database, label: 'Asset Classes', value: '10+' },
    { icon: TrendingUp, label: 'Synthetic Records', value: '280K+' },
    { icon: Brain, label: 'Deployment', value: 'AWS SageMaker' },
  ],
  ir: [
    { icon: Database, label: 'Queries Generated', value: '1M+' },
    { icon: Search, label: 'MS MARCO Passages', value: '8.8M' },
    { icon: TrendingUp, label: 'Latency Reduction', value: '6.5×' },
  ],
}

function ClusterStatBar({ stats, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-3 mb-6"
    >
      {stats.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm"
          style={{
            borderColor: `${accent}30`,
            background: `${accent}08`,
          }}
        >
          <Icon size={13} style={{ color: accent }} />
          <span style={{ color: accent }} className="font-mono font-semibold">{value}</span>
          <span className="text-[#8899BB] text-xs">{label}</span>
        </div>
      ))}
    </motion.div>
  )
}

function PipelineCluster({ title, subtitle, nodes, accent, statsKey }) {
  const [selected, setSelected] = useState(null)

  const handleClick = (node) => {
    setSelected(selected?.id === node.id ? null : node)
  }

  const mainNodes = nodes.filter((n) => !n.branch)
  const branchNode = nodes.find((n) => n.branch)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      {/* Header */}
      <div className="mb-5">
        <div
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border mb-3"
          style={{ color: accent, borderColor: `${accent}30`, background: `${accent}08` }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {subtitle}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#F0F4FF]">{title}</h3>
      </div>

      {/* Cluster stats bar */}
      <ClusterStatBar stats={clusterStats[statsKey]} accent={accent} />

      {/* Main pipeline */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-0">
        {mainNodes.map((node, i) => (
          <div key={node.id} className="flex flex-col md:flex-row md:items-stretch flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <PipelineNode
                node={node}
                isSelected={selected?.id === node.id}
                onClick={() => handleClick(node)}
              />
            </div>
            {i < mainNodes.length - 1 && (
              <>
                <PipelineArrow color={node.color} />
                <MobileArrow color={node.color} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Branch node */}
      {branchNode && (
        <div className="mt-4 flex items-start gap-4">
          <div
            className="ml-4 pl-4 border-l-2 border-dashed"
            style={{ borderColor: `${branchNode.color}30` }}
          >
            <div className="text-xs text-[#8899BB]/40 font-mono uppercase tracking-widest mb-2 flex items-center gap-1">
              <span>↳</span>
              <span>Related work — Pi Labs internship</span>
            </div>
            <div className="max-w-sm">
              <PipelineNode
                node={branchNode}
                isSelected={selected?.id === branchNode.id}
                onClick={() => handleClick(branchNode)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <NodeDetailPanel node={selected} onClose={() => setSelected(null)} />
      )}
    </motion.div>
  )
}

function OtherProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-navy-900 border border-navy-700 rounded-xl p-5 hover:border-accent-blue/30 hover:bg-navy-800/50 transition-all duration-300 group flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-navy-800 border border-navy-700 text-[#8899BB] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8899BB] hover:text-accent-blue transition-colors ml-2 shrink-0"
        >
          <Github size={16} />
        </a>
      </div>

      <h4 className="text-[#F0F4FF] font-semibold text-sm mb-2 group-hover:text-accent-blue transition-colors">
        {project.title}
      </h4>
      <p className="text-xs text-[#8899BB] leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded bg-navy-950/60 border border-navy-700 text-[#8899BB]/70"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">03</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#F0F4FF]">Projects</h2>
          <div className="flex-1 h-px bg-navy-700 ml-2" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#8899BB] text-sm mb-14 max-w-2xl"
        >
          Each cluster is an end-to-end pipeline — raw data to deployed model. Click any node to explore details, metrics, and tech stack.
        </motion.p>

        <PipelineCluster
          title="Financial AI · Elliott Wave Pipeline"
          subtitle="End-to-End Pipeline · 3 Repos"
          nodes={financialPipeline}
          accent="#4F8EF7"
          statsKey="financial"
        />

        <PipelineCluster
          title="IR / LLM Research · Data Flywheel"
          subtitle="End-to-End Pipeline · 4 Repos"
          nodes={irPipeline}
          accent="#00D4FF"
          statsKey="ir"
        />

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-lg font-medium text-[#F0F4FF]">Other Projects</h3>
            <div className="flex-1 h-px bg-navy-700" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProjects.map((p, i) => (
              <OtherProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
