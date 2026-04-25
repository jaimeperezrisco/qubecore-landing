import { useState } from 'react';
import { Shield, FileText, Cookie, Lock, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

const Legal = () => {
  const [openSection, setOpenSection] = useState('privacy');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <button 
          onClick={() => window.location.href = '/'} 
          className="inline-flex items-center gap-2 text-[var(--accent-cyan)] hover:opacity-80 mb-8 cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Legal <span className="text-gradient">Notices</span>
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">Last updated: April 25, 2026</p>

        <div className="space-y-4">
          {/* Privacy Policy */}
          <div className="glass-card">
            <button
              onClick={() => toggleSection('privacy')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Shield size={22} className="text-[var(--accent-cyan)]" />
                <div>
                  <h2 className="text-lg font-semibold">Privacy Policy</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Data protection and personal information handling</p>
                </div>
              </div>
              {openSection === 'privacy' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openSection === 'privacy' && (
              <div className="mt-6 pt-6 border-t border-[var(--glass-border)] space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">1. Data Controller</h3>
                  <p>QubeCore is responsible for processing your personal data. If you have questions about how we handle your information, contact us at privacy@qubecore.es.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">2. Data We Collect</h3>
                  <p>Through our contact form, we collect:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--text-secondary)]">
                    <li><strong>Name</strong> - To identify you and personalize communication</li>
                    <li><strong>Email</strong> - To respond to your inquiries</li>
                    <li><strong>Company</strong> - To understand your organizational context</li>
                    <li><strong>Phone</strong> (optional) - For direct contact if needed</li>
                    <li><strong>Message</strong> - To understand your needs and provide relevant information</li>
                    <li><strong>Service Interest</strong> - To direct your inquiry to the appropriate team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">3. Purpose and Legal Basis</h3>
                  <p>We process your data solely to respond to your inquiries about our quantum computing services. The legal basis is your <strong>consent</strong>, given voluntarily when submitting the form.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">4. Data Retention</h3>
                  <p>Your data is retained for 24 months from the date of submission. If you request deletion before this period, we will remove your data within 30 days.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">5. Your Rights (RGPD)</h3>
                  <p>Under the General Data Protection Regulation, you have the right to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--text-secondary)]">
                    <li><strong>Access</strong> - Request a copy of your data</li>
                    <li><strong>Rectification</strong> - Request correction of inaccurate data</li>
                    <li><strong>Erasure</strong> - Request deletion of your data ("right to be forgotten")</li>
                    <li><strong>Portability</strong> - Request your data in a structured, machine-readable format</li>
                    <li><strong>Object</strong> - Object to processing for direct marketing</li>
                  </ul>
                  <p className="mt-3">To exercise any of these rights, contact us at privacy@qubecore.es.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">6. Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
                </div>
              </div>
            )}
          </div>

          {/* Terms of Service */}
          <div className="glass-card">
            <button
              onClick={() => toggleSection('terms')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <FileText size={22} className="text-[var(--accent-cyan)]" />
                <div>
                  <h2 className="text-lg font-semibold">Terms of Service</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Conditions governing use of our services</p>
                </div>
              </div>
              {openSection === 'terms' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openSection === 'terms' && (
              <div className="mt-6 pt-6 border-t border-[var(--glass-border)] space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">1. Acceptance of Terms</h3>
                  <p>By using QubeCore services, you agree to these terms. If you do not agree, please do not use our services.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">2. Description of Services</h3>
                  <p>QubeCore provides enterprise quantum computing solutions including:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--text-secondary)]">
                    <li>Quantum Hardware Access</li>
                    <li>Quantum Software Development</li>
                    <li>Quantum Consulting</li>
                    <li>Quantum Education</li>
                    <li>Quantum Cloud Services</li>
                    <li>Quantum Security</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">3. User Responsibilities</h3>
                  <p>You agree to provide accurate information and use our services only for lawful purposes. You are responsible for maintaining the confidentiality of your account credentials.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">4. Intellectual Property</h3>
                  <p>All content on this website is the property of QubeCore or its licensors and is protected by intellectual property laws.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">5. Limitation of Liability</h3>
                  <p>QubeCore provides services "as is" without warranties. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">6. Modifications</h3>
                  <p>We may modify these terms at any time. Continued use after modifications constitutes acceptance of the new terms.</p>
                </div>
              </div>
            )}
          </div>

          {/* Cookie Policy */}
          <div className="glass-card">
            <button
              onClick={() => toggleSection('cookies')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Cookie size={22} className="text-[var(--accent-cyan)]" />
                <div>
                  <h2 className="text-lg font-semibold">Cookie Policy</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Information about the cookies we use</p>
                </div>
              </div>
              {openSection === 'cookies' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openSection === 'cookies' && (
              <div className="mt-6 pt-6 border-t border-[var(--glass-border)] space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">1. What Are Cookies?</h3>
                  <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and analyze how you use our site.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">2. Types of Cookies We Use</h3>
                  <div className="space-y-3 mt-3">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Essential Cookies</h4>
                      <p className="text-[var(--text-secondary)] text-xs">Required for the website to function. They enable core features like security and accessibility. These cookies do not require consent.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Analytics Cookies</h4>
                      <p className="text-[var(--text-secondary)] text-xs">Help us understand how visitors interact with our website by collecting anonymous information. Used to improve user experience.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium text-white mb-1">Functional Cookies</h4>
                      <p className="text-[var(--text-secondary)] text-xs">Remember your preferences and settings to provide enhanced, personalized features.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">3. How to Manage Cookies</h3>
                  <p>You can control cookie preferences through our banner when first visiting the site, or by adjusting your browser settings to accept, reject, or delete cookies.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">4. Third-Party Cookies</h3>
                  <p>We use third-party services that may set their own cookies (e.g., analytics tools). These are governed by the respective third-party privacy policies.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">5. Updates</h3>
                  <p>We may update this cookie list periodically. Check this page for the latest information.</p>
                </div>
              </div>
            )}
          </div>

          {/* Data Protection */}
          <div className="glass-card">
            <button
              onClick={() => toggleSection('rgpd')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Lock size={22} className="text-[var(--accent-cyan)]" />
                <div>
                  <h2 className="text-lg font-semibold">RGPD / GDPR Compliance</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Your data protection rights</p>
                </div>
              </div>
              {openSection === 'rgpd' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openSection === 'rgpd' && (
              <div className="mt-6 pt-6 border-t border-[var(--glass-border)] space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">1. Your Rights Summary</h3>
                  <p>As a user, you have the following rights regarding your personal data:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--text-secondary)]">
                    <li><strong>Right of Access</strong> - Know what data we have about you</li>
                    <li><strong>Right to Rectification</strong> - Correct inaccurate data</li>
                    <li><strong>Right to Erasure</strong> - Request deletion of your data</li>
                    <li><strong>Right to Portability</strong> - Receive your data in a portable format</li>
                    <li><strong>Right to Object</strong> - Object to processing for marketing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">2. How to Exercise Your Rights</h3>
                  <p>Send your request via email to <strong>privacy@qubecore.es</strong> with the subject "Data Protection Request". Include your name and email used on our site.</p>
                  <p className="mt-2">We will respond within 30 days.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">3. Right to Lodge a Complaint</h3>
                  <p>If you believe your rights have been violated, you have the right to lodge a complaint with the supervisory authority:</p>
                  <p className="mt-2"><strong>Agencia Española de Protección de Datos (AEPD)</strong></p>
                  <p className="text-[var(--text-secondary)]">www.aepd.es | 901 100 099 | 900 29 52 13</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--accent-cyan)] mb-2">4. Data Protection Officer</h3>
                  <p>For any questions about this policy or how we process your data, contact our privacy team:</p>
                  <p className="mt-2"><strong>Email:</strong> privacy@qubecore.es</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--text-secondary)]">
          <p>&copy; 2026 QubeCore. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Legal;