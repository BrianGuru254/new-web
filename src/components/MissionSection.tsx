import { Target, Check } from "lucide-react";
import type { SiteContent } from "../data/types";

export function MissionSection({ content }: { content: SiteContent }) {
  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Mission & Vision
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            {content.missionVisionTitle}
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            {content.missionVisionBody}
          </p>
        </div>

        {/* Mission statement */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg shadow-stone-200/50 border border-stone-100 mb-12">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-amber-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Our Mission</h3>
              <p className="text-stone-600 text-base leading-relaxed">
                {content.mission}
              </p>
            </div>
          </div>
        </div>

        {/* Objectives grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {content.objectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-amber-800" />
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
