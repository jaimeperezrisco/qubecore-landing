import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Cpu, ArrowRight } from 'lucide-react';

const HardwareDeepDive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Problem Assessment',
      description: 'Our quantum advisors analyze your computational challenges and identify quantum-suitable problems.',
      details: [
        'In-depth workload analysis',
        'Feasibility evaluation',
        'ROI projection',
      ],
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Custom Algorithm Design',
      description: 'We develop quantum algorithms specifically tailored to your use case and optimization goals.',
      details: [
        'Bespoke quantum circuits',
        'Hybrid classical-quantum solutions',
        'Performance benchmarking',
      ],
    },
    {
      number: '03',
      icon: Cpu,
      title: 'Hardware Matching',
      description: 'Based on your requirements, we design and provision the optimal quantum infrastructure.',
      details: [
        'Custom qubit topology',
        'Scalable architecture',
        'Seamless deployment',
      ],
    },
  ];

  return (
    <section id="hardware" className="section relative overflow-hidden" ref={ref}>
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Quantum Hardware Access</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
            We don't sell pre-packaged systems. We build quantum infrastructure around your mission.
          </p>
          <div className="inline-block glass-card px-6 py-3">
            <p className="text-[var(--accent-cyan)] font-semibold">
              No Fixed Products • 100% Customized Solutions
            </p>
          </div>
        </motion.div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="w-full h-full bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-magenta)] to-[var(--accent-cyan)] origin-top"
              style={{ opacity: 0.3 }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 glass-card md:max-w-md group hover:border-[var(--accent-cyan)] transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-gradient opacity-30">
                        {step.number}
                      </span>
                      <div className="p-3 rounded-xl glass group-hover:glow transition-all">
                        <Icon size={28} className="text-[var(--accent-cyan)]" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <ArrowRight size={16} className="text-[var(--accent-cyan)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Node */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                      className="w-16 h-16 rounded-full glass flex items-center justify-center border-2 border-[var(--accent-cyan)]"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className="w-10 h-10 rounded-full bg-[var(--accent-cyan)] opacity-30"
                      />
                      <div className="absolute w-4 h-4 rounded-full bg-[var(--accent-cyan)]" />
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1 max-w-md" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary text-lg px-8 py-4 glow inline-block">
            Talk to a Quantum Advisor
          </a>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            No commitment required • Free initial consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HardwareDeepDive;
