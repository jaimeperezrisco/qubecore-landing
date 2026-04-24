import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Team = ({ isColorblindMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const teamMembers = [
    {
      name: 'Jan Rutkowski',
      role: 'Strategic Partnerships Manager',
      specialty: 'Quantum algorithms & error correction',
      initials: 'JR',
      color: 'from-cyan-500 to-blue-600',
      colorblind: 'from-sky-500 to-indigo-600',
    },
    {
      name: 'Grzegorz Taras',
      role: 'Founder & Chief Quantum Scientist',
      specialty: 'Superconducting qubit design',
      initials: 'GT',
      color: 'from-violet-500 to-yellow-400',
      colorblind: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Gabriel Osmólski',
      role: 'Lead Hardware Architect',
      specialty: 'Enterprise quantum integration',
      initials: 'GO',
      color: 'from-emerald-500 to-teal-600',
      colorblind: 'from-slate-500 to-cyan-700',
    },
  ];

  return (
    <section id="team" className="section bg-[var(--bg-secondary)]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the <span className="text-gradient">Minds</span> Behind{' '}
            <span>
              <span className="text-[var(--accent-gold)]">Q</span>
              <span className="text-gradient">ube</span>
              <span className="text-[var(--accent-gold)]">C</span>
              <span className="text-gradient">ore</span>
            </span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            A team of world-class quantum experts dedicated to democratizing quantum computing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card text-center group"
            >
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                      className={`w-32 h-32 rounded-full bg-gradient-to-br ${isColorblindMode ? member.colorblind : member.color} flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden`}
                    >
                    <span className="text-3xl font-bold text-white tracking-wide">{member.initials}</span>
                  </motion.div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity glow" />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-[var(--accent-cyan)] font-semibold mb-3 text-sm">
                {member.role}
              </p>
              <p className="text-sm text-[var(--text-secondary)] italic">
                {member.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
