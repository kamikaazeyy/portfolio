'use client';

import { useState } from 'react';
import { BsLinkedin, BsGithub, BsTwitterX } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

const socialLinks = [
  {
    name: "Email",
    href: "mailto:mehrotrapranav240@gmail.com",
    icon: MdOutlineEmail,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pranav-mehrotra-879025194/",
    icon: BsLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/kamikaazeyy",
    icon: BsGithub,
  },
  {
    name: "X",
    href: "https://twitter.com/mehrotrapranav1",
    icon: BsTwitterX,
  }
];

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzZUz-RGAVQaQdu66l8gq3mpOdguxOQN_dbY3EC4G5lZ4jjGgbwixhr3cusUsoDyr7p_g/exec",
        { method: "POST", body: formData }
      );
      await response.json();
      e.target.reset();
      setFormStatus('Message transmitted successfully.');
      setTimeout(() => setFormStatus(''), 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus('Failed to send message. Please try again.');
      setTimeout(() => setFormStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs tracking-wider">
            <span>{"// 03. CONTACT"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-wider">
            Get In Touch
          </h2>
        </div>

        {/* Single Unified Contact Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/85 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {/* Compact Social Icons Bar */}
          <div className="flex items-center justify-center gap-4 pb-6 mb-6 border-b border-white/10">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 transition-all text-xs font-mono"
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </a>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name-input" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name-input"
                  name="Name"
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email-input"
                  name="Email"
                  required
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message-input" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message-input"
                name="Message"
                rows="4"
                required
                placeholder="Your message..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full py-3 px-6 rounded-xl font-orbitron text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-cyan-500 hover:from-red-500 hover:via-rose-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(255,51,85,0.3)] hover:shadow-[0_0_28px_rgba(0,229,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>

            {formStatus && (
              <div className={`p-3 rounded-xl text-center text-xs font-mono border ${
                formStatus.includes('Failed') 
                  ? 'bg-red-950/30 border-red-500/40 text-red-300' 
                  : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              }`}>
                {formStatus}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
