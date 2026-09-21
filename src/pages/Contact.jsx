import ContactForm from "../components/ContactForm";

const CALENDLY_URL = "https://calendly.com/24-7-hire";

const contactDetails = [
  { icon: "✉️", label: "Email",          value: "contact@copiagroupllc.com.au", href: "mailto:contact@copiagroupllc.com.au" },
  { icon: "🌐", label: "Website",        value: "copiagroupllc.com.au",          href: "https://copiagroupllc.com.au" },
  { icon: "🏢", label: "Headquarters",   value: "Sydney, New South Wales, Australia", href: null },
  { icon: "🔗", label: "Parent Company", value: "copiagroupllc.com",             href: "https://copiagroupllc.com" },
];

export default function Contact() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">Get in Touch</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 max-w-2xl font-display">Let's Start a Conversation</h1>
          <p className="text-gray-400 text-xl max-w-xl leading-relaxed">Whether you're an investor, developer, partner, or just curious — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Left */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3 font-display">Contact Information</h2>
                <p className="text-gray-500 text-sm leading-relaxed">Reach out directly or fill in the form and we'll respond within one business day (AEST).</p>
              </div>

              <div className="flex flex-col gap-3">
                {contactDetails.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-[#111118]">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          className="text-white text-sm hover:text-[#6366F1] transition-colors break-all">{value}</a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Book a Call */}
              <div className="p-5 rounded-2xl border border-[#6366F1]/25 bg-[#6366F1]/6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[#6366F1] text-xs font-semibold uppercase tracking-widest">Book a Call</p>
                </div>
                <p className="text-gray-400 text-sm mb-4">Prefer to talk? Schedule a 1 hour call with our team directly — no back-and-forth required.</p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6366F1] text-white text-sm font-bold hover:bg-indigo-400 transition-colors shadow-md shadow-indigo-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule on Calendly
                </a>
              </div>

              {/* Response time */}
              <div className="p-5 rounded-2xl border border-white/8 bg-[#111118]">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">Response Time</p>
                <p className="text-gray-500 text-sm">We typically respond within 24 hours on business days (Monday–Friday, AEST).</p>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-2 p-8 rounded-2xl border border-white/8 bg-[#111118]">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
