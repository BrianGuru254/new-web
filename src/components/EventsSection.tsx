import { Calendar, ArrowRight } from "lucide-react";
import type { SiteContent } from "../data/types";

export function EventsSection({ content }: { content: SiteContent }) {
  if (content.events.length === 0) return null;

  return (
    <section id="events" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Upcoming Events
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            What's coming up
          </h2>
          <p className="text-stone-600 text-lg">
            Mark your calendar and join us for fellowship and spiritual growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.events.map((event, index) => (
            <div
              key={event.title}
              className={`group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                index === 0
                  ? "bg-stone-900 text-white border-stone-800"
                  : "bg-white text-stone-900 border-stone-100 hover:border-amber-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    index === 0 ? "bg-white/15" : "bg-amber-50"
                  }`}
                >
                  <Calendar
                    className={`w-5 h-5 ${index === 0 ? "text-amber-300" : "text-amber-700"}`}
                  />
                </div>
                <span
                  className={`text-sm font-bold ${
                    index === 0 ? "text-amber-300" : "text-amber-700"
                  }`}
                >
                  {event.date}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  index === 0 ? "text-white/70" : "text-stone-500"
                }`}
              >
                {event.summary}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className={index === 0 ? "text-amber-300" : "text-amber-700"}>
                  Learn more
                </span>
                <ArrowRight
                  className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                    index === 0 ? "text-amber-300" : "text-amber-700"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
