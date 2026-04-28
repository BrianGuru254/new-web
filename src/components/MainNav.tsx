import { useState } from "react";
import { Menu, X, Church } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
};

export function MainNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact-form"
          className="ml-2 px-5 py-2.5 bg-amber-800 text-white text-sm font-semibold rounded-full hover:bg-amber-900 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Plan Your Visit
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-stone-200 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all"
        onClick={() => setIsOpen((c) => !c)}
        type="button"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

      {/* Mobile nav overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/98 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-800 rounded-xl flex items-center justify-center">
                  <Church className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-stone-900">Mitombili SDA</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-1">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-4 text-2xl font-semibold text-stone-800 hover:text-amber-800 transition-colors border-b border-stone-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="px-8 pb-8">
              <a
                href="#contact-form"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 bg-amber-800 text-white text-center font-semibold rounded-2xl hover:bg-amber-900 transition-colors"
              >
                Plan Your Visit
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
