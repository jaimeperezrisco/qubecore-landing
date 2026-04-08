import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User } from 'lucide-react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const teamMembers = [
    {
      name: 'Janek',
      role: 'Founder & Chief Quantum Scientist',
      specialty: 'Quantum algorithms & error correction',
    },
    {
      name: 'Gabriel',
      role: 'Lead Hardware Architect',
      specialty: 'Superconducting qubit design',
    },
    {
      name: 'tari_18',
      role: 'Strategic Partnerships Manager',
      specialty: 'Enterprise quantum integration',
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
            Meet the <span className="text-gradient">Minds</span> Behind QubeCore
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
                    className="w-32 h-32 rounded-full glass flex items-center justify-center border-2 border-[var(--accent-cyan)] overflow-hidden"
                  >
                    <User size={48} className="text-[var(--accent-cyan)]" />
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
