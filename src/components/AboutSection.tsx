import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "../data/types";

export function AboutSection({ content }: { content: SiteContent }) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/40 aspect-[4/3]">
              <img
                src="/images/congregation.jpg"
                alt={`${content.churchName} congregation`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-white font-semibold text-lg">Worship, fellowship, and discipleship</p>
                <p className="text-white/70 text-sm mt-1">
                  A Christ-centered church family serving Mitombili and the wider community.
                </p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-stone-100 rounded-2xl -z-10" />
          </div>

          {/* Text side */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-6">
              {content.aboutTitle}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {content.aboutBody}
            </p>

            {/* Theme verse */}
            <blockquote className="relative pl-6 border-l-4 border-amber-400 py-2 mb-8">
              <p className="text-stone-700 italic text-base leading-relaxed font-medium">
                {content.themeVerse}
              </p>
            </blockquote>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#prayer-form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-all duration-200 text-sm"
              >
                Request Prayer
              </a>
              <a
                href={content.livestreamUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all duration-200 text-sm"
              >
                Visit YouTube <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick links */}
            <div className="mt-10 space-y-3">
              {content.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-all duration-200 group"
                >
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">{link.label}</div>
                    <div className="text-stone-500 text-xs mt-0.5">{link.description}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition-colors flex-shrink-0 ml-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
