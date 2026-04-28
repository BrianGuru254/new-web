import { Church, Mail, MapPin, ExternalLink } from "lucide-react";
import type { SiteContent } from "../data/types";

export function Footer({ content }: { content: SiteContent }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-800 rounded-xl flex items-center justify-center">
                <Church className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">{content.churchName}</div>
                <div className="text-stone-400 text-xs">{content.location}</div>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              {content.mission}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-stone-200">Quick Links</h4>
            <nav className="space-y-2.5">
              {[
                { href: "#about", label: "About" },
                { href: "#worship", label: "Worship Times" },
                { href: "#sermons", label: "Sermons" },
                { href: "#events", label: "Events" },
                { href: "#ministries", label: "Ministries" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-stone-400 text-sm hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-stone-200">Resources</h4>
            <nav className="space-y-2.5">
              {content.resources.map((res) => (
                <a
                  key={res.label}
                  href={res.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-400 text-sm hover:text-amber-400 transition-colors"
                >
                  {res.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
              <a
                href={content.livestreamUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-stone-400 text-sm hover:text-amber-400 transition-colors"
              >
                YouTube Channel <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-stone-200">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400 text-sm">{content.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href={`mailto:${content.email}`} className="text-stone-400 text-sm hover:text-amber-400 transition-colors">
                  {content.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © {currentYear} {content.churchName}. Seventh-day Adventist Church.
          </p>
          <p className="text-stone-600 text-xs">
            A Christ-centered community of faith, hope, and love.
          </p>
        </div>
      </div>
    </footer>
  );
}
