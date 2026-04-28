import { Clock, BookOpen, Heart } from "lucide-react";
import type { SiteContent } from "../data/types";

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/church-hero.jpg"
          alt={content.churchName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/70 to-stone-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/90">
              Welcome Home
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6">
            {content.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg mb-10">
            {content.heroSubtitle} {content.welcomeMessage}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl shadow-amber-900/30 hover:shadow-2xl hover:shadow-amber-900/40 hover:-translate-y-0.5 text-base"
            >
              Plan Your Visit
            </a>
            <a
              href="#worship"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
              Worship Times
            </a>
          </div>

          {/* Service times quick bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl">
              <BookOpen className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">{content.sabbathSchoolTime}</div>
                <div className="text-white/60 text-xs">Sabbath School</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">{content.divineServiceTime}</div>
                <div className="text-white/60 text-xs">Divine Service</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl">
              <Heart className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">{content.midweekTime}</div>
                <div className="text-white/60 text-xs">Prayer Meeting</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
