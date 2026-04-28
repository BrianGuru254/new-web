import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone, Send, BookOpen, MessageCircle } from "lucide-react";
import type { SiteContent } from "../data/types";

function FormStatus({ status }: { status: { type: "success" | "error" | ""; message: string } }) {
  if (!status.message) return null;
  return (
    <div
      className={`mt-4 p-4 rounded-xl text-sm font-medium ${
        status.type === "success"
          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {status.message}
    </div>
  );
}

export function ContactSection({ content }: { content: SiteContent }) {
  const [contactStatus, setContactStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [prayerStatus, setPrayerStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [appointmentStatus, setAppointmentStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    setStatus: (s: { type: "success" | "error"; message: string }) => void
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (preserving original form action pattern)
    const action = form.getAttribute("action");
    if (action) {
      setStatus({ type: "success", message: "Sending..." });
      fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const result = (await res.json()) as { message?: string };
          if (!res.ok) throw new Error(result.message || "Unable to submit.");
          form.reset();
          setStatus({ type: "success", message: result.message || "Submitted successfully." });
        })
        .catch((err) => {
          setStatus({
            type: "error",
            message: err instanceof Error ? err.message : "Unable to submit.",
          });
        });
    } else {
      form.reset();
      setStatus({ type: "success", message: "Thank you! Your message has been received." });
    }
  };

  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(content.location)}&output=embed`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            We'd love to hear from you
          </h2>
          <p className="text-stone-600 text-lg">
            Reach out with questions, prayer requests, or to plan your first visit.
          </p>
        </div>

        {/* Contact info + Map */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-stone-900 text-sm">Location</div>
                <div className="text-stone-500 text-sm">{content.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-stone-900 text-sm">Email</div>
                <a href={`mailto:${content.email}`} className="text-amber-700 text-sm hover:underline">
                  {content.email}
                </a>
              </div>
            </div>
            {content.phone && (
              <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <div className="font-semibold text-stone-900 text-sm">Phone</div>
                  <div className="text-stone-500 text-sm">{content.phone}</div>
                </div>
              </div>
            )}

            {/* Pastoral care card */}
            <div className="p-6 bg-stone-900 text-white rounded-2xl mt-6">
              <h3 className="font-bold text-lg mb-2">{content.appointmentTitle}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {content.appointmentBody}
              </p>
              <a
                href="#appointment-form"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-stone-900 font-semibold text-sm rounded-xl hover:bg-stone-100 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Book Appointment
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 h-80 lg:h-auto min-h-[320px]">
            <iframe
              src={googleMapsEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church location map"
            />
          </div>
        </div>

        {/* Forms grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact form */}
          <div id="contact-form" className="bg-stone-50 p-6 lg:p-8 rounded-3xl border border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Contact Us</h3>
            </div>
            <form
              data-enhanced-form="true"
              action="/api/contact"
              onSubmit={(e) => handleSubmit(e, setContactStatus)}
              className="space-y-4"
            >
              <input type="hidden" name="type" value="contact" />
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-all duration-200 text-sm"
              >
                Send Message
              </button>
              <FormStatus status={contactStatus} />
            </form>
          </div>

          {/* Prayer form */}
          <div id="prayer-form" className="bg-stone-50 p-6 lg:p-8 rounded-3xl border border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Prayer Request</h3>
            </div>
            <form
              data-enhanced-form="true"
              action="/api/prayer"
              onSubmit={(e) => handleSubmit(e, setPrayerStatus)}
              className="space-y-4"
            >
              <input type="hidden" name="type" value="prayer" />
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Prayer Request</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="Share your prayer request (confidential)..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-all duration-200 text-sm"
              >
                Submit Prayer Request
              </button>
              <FormStatus status={prayerStatus} />
            </form>
          </div>

          {/* Appointment form */}
          <div id="appointment-form" className="bg-stone-50 p-6 lg:p-8 rounded-3xl border border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">Book Appointment</h3>
            </div>
            <form
              data-enhanced-form="true"
              action="/api/appointment"
              onSubmit={(e) => handleSubmit(e, setAppointmentStatus)}
              className="space-y-4"
            >
              <input type="hidden" name="type" value="appointment" />
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Phone number (optional)"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Reason for Visit</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="Prayer, counseling, family support..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-all duration-200 text-sm"
              >
                Request Appointment
              </button>
              <FormStatus status={appointmentStatus} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
