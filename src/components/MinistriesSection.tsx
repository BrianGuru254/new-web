import { Heart, Users, Shield, Activity, Megaphone, Baby } from "lucide-react";
import type { SiteContent } from "../data/types";

const ministryIcons: Record<string, React.ReactNode> = {
  "Children's Ministry": <Baby className="w-6 h-6" />,
  "Youth & Ambassadors": <Users className="w-6 h-6" />,
  "Women's Ministry": <Heart className="w-6 h-6" />,
  "Men's Ministry": <Shield className="w-6 h-6" />,
  "Health Ministry": <Activity className="w-6 h-6" />,
  "Community Outreach": <Megaphone className="w-6 h-6" />,
};

export function MinistriesSection({ content }: { content: SiteContent }) {
  return (
    <section id="ministries" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Ministries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            Serving together in love
          </h2>
          <p className="text-stone-600 text-lg">
            Every member has a place. Explore our ministries and find yours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.ministries.map((ministry) => (
            <div
              key={ministry.name}
              className="group p-6 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                {ministryIcons[ministry.name] || <Heart className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{ministry.name}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{ministry.summary}</p>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold text-stone-900 mb-8">
            Church Departments
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.departments.map((dept) => (
              <div
                key={dept.name}
                className="flex items-start justify-between gap-4 p-6 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 mb-2">{dept.name}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{dept.summary}</p>
                </div>
                <a
                  href={dept.actionHref}
                  target={dept.actionHref.startsWith("http") ? "_blank" : undefined}
                  rel={dept.actionHref.startsWith("http") ? "noreferrer" : undefined}
                  className="flex-shrink-0 px-4 py-2 bg-amber-50 text-amber-800 font-semibold text-xs rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
                >
                  {dept.actionLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
