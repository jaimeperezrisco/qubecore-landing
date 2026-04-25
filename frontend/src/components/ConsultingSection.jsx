import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Headphones, Lightbulb, Settings, Clock, BarChart3, Shield } from 'lucide-react';

const ConsultingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Lightbulb,
      title: 'Use Case Analysis',
      description: 'We identify the most impactful quantum computing opportunities for your business',
      items: [
        'Quantum advantage assessment',
        'Business case development',
        'Risk evaluation',
        'ROI projections',
      ],
    },
    {
      icon: Settings,
      title: 'Algorithm Optimization',
      description: 'Fine-tune your quantum algorithms for maximum performance and efficiency',
      items: [
        'Performance benchmarking',
        'Error correction strategies',
        'Hybrid quantum-classical optimization',
        'Circuit depth reduction',
      ],
    },
    {
      icon: BarChart3,
      title: 'Implementation Support',
      description: 'End-to-end guidance during your quantum integration journey',
      items: [
        'Architecture design',
        'System integration',
        'Workflow automation',
        'Staff training',
      ],
    },
    {
      icon: Clock,
      title: '24/7 Technical Assistance',
      description: 'Round-the-clock support from our team of quantum experts',
      items: [
        'Real-time troubleshooting',
        'Emergency response',
        'System monitoring',
        'Continuous improvements',
      ],
    },
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '99.9%', label: 'Uptime Guaranteed' },
    { value: '24/7', label: 'Support Available' },
    { value: '50+', label: 'Quantum Experts' },
  ];

  return (
    <section id="consulting" className="section" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Consulting</span> & Support
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Strategic guidance from quantum experts to accelerate your quantum journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card group hover:border-[var(--accent-cyan)] transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-magenta)]">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 ml-15">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-cyan)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <a href="#contact" className="btn-primary inline-block">
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultingSection;