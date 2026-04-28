import { Clock } from "lucide-react";
import type { SiteContent } from "../data/types";

export function WorshipTimesSection({ content }: { content: SiteContent }) {
  return (
    <section id="worship" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Worship Schedule
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            Join us for worship
          </h2>
          <p className="text-stone-600 text-lg">
            Every gathering is an opportunity to encounter God and grow together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.serviceTimes.map((service, index) => (
            <div
              key={service.title}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                index === 2
                  ? "bg-amber-800 text-white border-amber-700 shadow-lg shadow-amber-900/20"
                  : "bg-white text-stone-900 border-stone-150 hover:border-amber-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    index === 2 ? "bg-white/20" : "bg-amber-50"
                  }`}
                >
                  <Clock
                    className={`w-5 h-5 ${
                      index === 2 ? "text-amber-200" : "text-amber-700"
                    }`}
                  />
                </div>
                <time
                  className={`text-sm font-bold ${
                    index === 2 ? "text-amber-200" : "text-amber-700"
                  }`}
                >
                  {service.time}
                </time>
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p
                className={`text-sm leading-relaxed ${
                  index === 2 ? "text-white/75" : "text-stone-500"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
