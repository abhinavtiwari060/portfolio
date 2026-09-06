"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, Mail, Copy, Check, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ClayCard from "../ui/ClayCard";
import ClayInput, { ClayTextarea } from "../ui/ClayInput";
import ClayButton from "../ui/ClayButton";
import SocialButton from "../ui/SocialButton";
import { useToast } from "../ui/ToastNotification";

interface ContactSectionProps {
  email?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email = "abhitiwariaj@gmail.com",
  socialLinks = [
    { platform: "GitHub", url: "https://github.com/abhinavtiwari" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abhinavtiwari" },
    { platform: "Twitter", url: "https://twitter.com/abhinavtiwari" },
  ],
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    showToast("Email address copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      showToast("Thank you for reaching out!", "success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Confetti with warm orange palette
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#f97316", "#ea580c", "#fb923c", "#ffffff"],
        });

        showToast("Message sent successfully! I'll get back to you soon.", "success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        showToast(data.message || "Failed to send message.", "error");
      }
    } catch {
      showToast("An unexpected network error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern transition-colors">
      {/* Subtle warm orange ambient light (NO NEON) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-orange-600/10 dark:bg-orange-600/10 light:bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Get in Touch"
          title="Have an idea? Let's build it."
          subtitle="Whether you're looking to discuss a project, explore technical collaboration, or simply say hi—my inbox is always open."
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <ClayCard className="lg:col-span-5 p-8 flex flex-col justify-between h-full border border-white/5 dark:border-white/5 light:border-orange-500/20">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-6 shadow-clay-pill border border-orange-500/30">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-charcoal-900 mb-3">
                Let's talk code & products
              </h3>
              <p className="text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600 leading-relaxed mb-8">
                I'm actively seeking opportunities to build impact-driven applications with thoughtful teams. Drop me a note and I'll respond within 24 hours.
              </p>

              {/* Email Copy Card */}
              <div className="p-4 rounded-2xl bg-charcoal-900/90 dark:bg-charcoal-900/90 light:bg-white border border-white/5 dark:border-white/5 light:border-orange-500/15 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 text-orange-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal-200 dark:text-charcoal-200 light:text-charcoal-800 truncate">
                    {email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 rounded-xl bg-charcoal-800 dark:bg-charcoal-800 light:bg-orange-500/10 text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700 hover:text-orange-400 transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-500 mb-3">
                Connect on Socials
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s, idx) => (
                  <SocialButton key={idx} platform={s.platform} url={s.url} />
                ))}
              </div>
            </div>
          </ClayCard>

          {/* Contact Form */}
          <ClayCard className="lg:col-span-7 p-8 sm:p-10 border border-white/5 dark:border-white/5 light:border-orange-500/20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  autoComplete="off"
                />
              </div>

              <ClayInput
                label="Your Name"
                placeholder="e.g. Sarah Connor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <ClayInput
                label="Your Email Address"
                type="email"
                placeholder="e.g. sarah@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <ClayTextarea
                label="Your Message"
                placeholder="Tell me about your project, team, or opportunity..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <ClayButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full mt-2"
                icon={<Send className="w-4 h-4" />}
              >
                {loading ? "Sending..." : "Send Message"}
              </ClayButton>
            </form>
          </ClayCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
