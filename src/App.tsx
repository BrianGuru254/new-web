import { siteContent } from "./data/site-content";
import { MainNav } from "./components/MainNav";
import { HeroSection } from "./components/HeroSection";
import { AnnouncementStrip } from "./components/AnnouncementStrip";
import { AboutSection } from "./components/AboutSection";
import { MissionSection } from "./components/MissionSection";
import { WorshipTimesSection } from "./components/WorshipTimesSection";
import { SermonsSection } from "./components/SermonsSection";
import { EventsSection } from "./components/EventsSection";
import { MinistriesSection } from "./components/MinistriesSection";
import { GivingSection } from "./components/GivingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Church } from "lucide-react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#worship", label: "Worship" },
  { href: "#sermons", label: "Sermons" },
  { href: "#events", label: "Events" },
  { href: "#ministries", label: "Ministries" },
  { href: "#contact", label: "Contact" },
];

export default function App() {
  const content = siteContent;

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 lg:h-18">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-800 rounded-xl flex items-center justify-center group-hover:bg-amber-900 transition-colors">
              <Church className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-stone-900 text-sm leading-tight">{content.churchName}</div>
              <div className="text-stone-400 text-xs">{content.location}</div>
            </div>
          </a>
          <MainNav items={navItems} />
        </div>
      </header>

      {/* Main content */}
      <main id="top">
        <HeroSection content={content} />
        <AnnouncementStrip announcements={content.announcements} />
        <AboutSection content={content} />
        <MissionSection content={content} />
        <WorshipTimesSection content={content} />
        <SermonsSection content={content} />
        <EventsSection content={content} />
        <MinistriesSection content={content} />
        <GivingSection content={content} />
        <ContactSection content={content} />
      </main>

      <Footer content={content} />
    </div>
  );
}
