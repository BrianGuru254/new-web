import { Bell } from "lucide-react";

export function AnnouncementStrip({ announcements }: { announcements: string[] }) {
  if (announcements.length === 0) return null;

  const doubledAnnouncements = [...announcements, ...announcements];

  return (
    <section className="bg-amber-800 text-white py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Bell className="w-4 h-4 text-amber-200" />
          <span className="text-xs font-bold tracking-widest uppercase text-amber-200 hidden sm:inline">
            Church Life
          </span>
        </div>
        <div className="overflow-hidden relative flex-1">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubledAnnouncements.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mx-8 text-sm font-medium text-white/90"
                aria-hidden={index >= announcements.length}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
