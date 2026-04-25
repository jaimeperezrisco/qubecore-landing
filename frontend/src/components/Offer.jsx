import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, GraduationCap, Headphones } from 'lucide-react';

const Offer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const offers = [
    {
      icon: Cpu,
      title: 'Quantum Hardware Access',
      description: 'Custom quantum systems tailored to your computational needs. No off-the-shelf solutions—only infrastructure designed for your specific challenges.',
      features: [
        'Customized quantum processors',
        'Scalable architecture',
        'Enterprise-grade reliability',
        'Seamless cloud integration',
      ],
      highlight: true,
      ctaLink: '#hardware',
    },
    {
      icon: GraduationCap,
      title: 'Training & Education',
      description: 'Comprehensive quantum computing training programs for your team, from foundational concepts to advanced algorithm development.',
      features: [
        'Hands-on workshops',
        'Expert-led courses',
        'Certification programs',
        'Ongoing learning resources',
      ],
      highlight: true,
      ctaLink: '#training',
    },
    {
      icon: Headphones,
      title: 'Consulting & Support',
      description: 'Strategic guidance from quantum experts to identify use cases, optimize algorithms, and accelerate your quantum journey.',
      features: [
        'Use case analysis',
        'Algorithm optimization',
        'Implementation support',
        '24/7 technical assistance',
      ],
      highlight: true,
      ctaLink: '#consulting',
    },
  ];

  return (
    <section id="offer" className="section" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Quantum Solutions</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            End-to-end quantum computing services designed to transform your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`glass-card group ${
                  offer.highlight ? 'border-2 border-[var(--accent-cyan)]' : ''
                }`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${
                    offer.highlight 
                      ? 'bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-magenta)]' 
                      : 'glass'
                  }`}>
                    <Icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {offer.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-cyan)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {offer.highlight && offer.ctaLink && (
                  <a 
                    href={offer.ctaLink} 
                    className="block w-full text-center btn-primary mt-4"
                  >
                    Learn More
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offer;
