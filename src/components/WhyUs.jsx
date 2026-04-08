import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Target, Rocket, Users, Globe } from 'lucide-react';

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const strengths = [
    {
      icon: Zap,
      title: 'Cutting-Edge Technology',
      description: 'Access to the latest quantum computing hardware and algorithms',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'World-class quantum physicists and engineers at your service',
    },
    {
      icon: Target,
      title: 'Tailored Solutions',
      description: 'Custom-built systems designed for your specific use cases',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with industry standards',
    },
    {
      icon: Rocket,
      title: 'Rapid Deployment',
      description: 'From consultation to production in weeks, not years',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Distributed infrastructure with low-latency worldwide access',
    },
  ];

  return (
    <section id="why-us" className="section bg-[var(--bg-secondary)]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">QubeCore</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Leading the quantum revolution with innovation, expertise, and unwavering commitment to your success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl glass group-hover:glow transition-all">
                    <Icon size={24} className="text-[var(--accent-cyan)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{strength.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
