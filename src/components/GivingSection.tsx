import { Gift } from "lucide-react";
import type { SiteContent } from "../data/types";

export function GivingSection({ content }: { content: SiteContent }) {
  return (
    <section className="py-20 lg:py-28 bg-amber-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Gift className="w-8 h-8 text-amber-200" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
          {content.givingTitle}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {content.givingBody}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {content.givingHref && (
            <a
              href={content.givingHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Give Online
            </a>
          )}
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold rounded-2xl hover:bg-white/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Us to Give
          </a>
        </div>
      </div>
    </section>
  );
}
