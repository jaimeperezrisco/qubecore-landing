import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, User, Building, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailJsConfig } from '../config/emailjs.config';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'hardware',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({ loading: true, success: false, error: false, message: '' });

    // Debug: Log configuration
    console.log('🔍 EmailJS Configuration Check:');
    console.log('Service ID:', emailJsConfig.serviceId);
    console.log('Template ID:', emailJsConfig.templateId);
    console.log('Public Key:', emailJsConfig.publicKey);
    console.log('Form Data:', formData);

    try {
      // Enviar email usando el template (EmailJS usa la Public Key automáticamente)
      const result = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          interest: formData.interest,
          message: formData.message,
          to_name: 'QubeCore Team',
        },
        emailJsConfig.publicKey
      );

      console.log('✅ Email sent successfully:', result);

      // Success state
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        interest: 'hardware',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      console.error('Error Text:', error.text);
      console.error('Error Status:', error.status);
      
      // Error state
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: `Oops! Something went wrong: ${error.text || error.message}. Please try again or contact us directly at contact@qubecore.com`,
      });

      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false, message: '' });
      }, 5000);
    }
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
          {/* Status Messages */}
          {formStatus.success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-start gap-3"
            >
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-green-100 text-sm">{formStatus.message}</p>
            </motion.div>
          )}

          {formStatus.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-start gap-3"
            >
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-100 text-sm">{formStatus.message}</p>
            </motion.div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                disabled={formStatus.loading}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={formStatus.loading}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="QubeCore"
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
                disabled={formStatus.loading}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="John@qubecore.com"
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
                disabled={formStatus.loading}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={formStatus.loading}
                className="w-full px-4 py-3 rounded-xl glass border border-[var(--glass-border)] 
                         bg-[var(--glass-bg)] text-[var(--text-primary)] 
                         focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell us about your quantum computing needs..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={formStatus.loading}
              whileHover={!formStatus.loading ? { scale: 1.02 } : {}}
              whileTap={!formStatus.loading ? { scale: 0.98 } : {}}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus.loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
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
