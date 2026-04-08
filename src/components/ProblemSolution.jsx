import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertCircle, Zap } from 'lucide-react';

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="problem" className="section" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Breaking the <span className="text-gradient">Computational Barrier</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-400" size={32} />
              <h3 className="text-2xl font-bold">The Challenge</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Classical computing hits fundamental limits when tackling complex problems:
            </p>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Exponential time complexity for optimization problems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Limited scalability in molecular simulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Insufficient processing power for cryptography challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Massive energy consumption at scale</span>
              </li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card border-[var(--accent-cyan)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-[var(--accent-cyan)]" size={32} />
              <h3 className="text-2xl font-bold">Our Solution</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              QubeCore provides enterprise-grade quantum computing infrastructure:
            </p>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)] mt-1">✓</span>
                <span>Quantum algorithms that solve in polynomial time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)] mt-1">✓</span>
                <span>Customized hardware matched to your workload</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)] mt-1">✓</span>
                <span>Seamless integration with existing infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)] mt-1">✓</span>
                <span>Expert guidance from problem definition to deployment</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
