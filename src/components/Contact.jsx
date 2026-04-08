import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, User, Building, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'hardware',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se integrará el backend más adelante
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="section relative overflow-hidden min-h-screen flex items-center">
      {/* Dense particle cluster background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-cyan)]/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient">Go Quantum</span>?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start your quantum journey today. Our advisors are ready to help you unlock unprecedented computational power.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 md:p-12 border-2 border-[var(--accent-cyan)]"
          ref={ref}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <User size={18} className="text-[var(--accent-cyan)]" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Building size={18} className="text-[var(--accent-cyan)]" />
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
                placeholder="Acme Corp"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Mail size={18} className="text-[var(--accent-cyan)]" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
                placeholder="john@acme.com"
              />
            </div>

            {/* Interest */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Area of Interest
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
              >
                <option value="hardware">Quantum Hardware Access</option>
                <option value="training">Training & Education</option>
                <option value="consulting">Consulting & Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={18} className="text-[var(--accent-cyan)]" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none"
                placeholder="Tell us about your quantum computing needs..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </form>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            We typically respond within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
