import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Award, Users, Clock, TrendingUp } from 'lucide-react';

const TrainingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const programs = [
    {
      icon: BookOpen,
      title: 'Foundations of Quantum Computing',
      description: 'Master the fundamental principles of quantum mechanics and computing',
      duration: '2 weeks',
      level: 'Beginner',
    },
    {
      icon: Award,
      title: 'Quantum Algorithm Development',
      description: 'Learn to design and implement quantum algorithms for real-world applications',
      duration: '4 weeks',
      level: 'Intermediate',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Quantum Optimization',
      description: 'Deep dive into QAOA, VQE, and other advanced quantum optimization techniques',
      duration: '6 weeks',
      level: 'Advanced',
    },
    {
      icon: Users,
      title: 'Enterprise Quantum Integration',
      description: 'Strategic implementation of quantum solutions in enterprise environments',
      duration: '8 weeks',
      level: 'Executive',
    },
  ];

  const features = [
    { icon: Clock, text: 'Self-paced learning with expert support' },
    { icon: Award, text: 'Industry-recognized certifications' },
    { icon: Users, text: 'Live sessions with quantum experts' },
    { icon: TrendingUp, text: 'Hands-on lab sessions on real quantum hardware' },
  ];

  return (
    <section id="training" className="section bg-[var(--bg-secondary)]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Training</span> & Education
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Empower your team with cutting-edge quantum computing knowledge
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card group hover:border-[var(--accent-cyan)] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-magenta)]">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{program.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full glass text-[var(--accent-cyan)]">
                        {program.level}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <Clock size={14} />
                      <span>{program.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-xl glass mb-3">
                  <Icon size={24} className="text-[var(--accent-cyan)]" />
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{feature.text}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary inline-block">
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingSection;