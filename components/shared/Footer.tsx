import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="border-t border-white/5"
      style={{
        background:
          "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">

        {/* Main Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-yellow-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="#1a1a2e"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Assign<span className="text-yellow-300">Hub</span>
              </span>
            </Link>
            <p className="text-white/30 text-xs leading-relaxed mb-3 max-w-[180px]">
              Smart platform for teachers & students to manage assignments.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: "FB", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z" },
                { label: "TW", path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { label: "LI", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }
              ].map((s) => (
                <Link key={s.label} href="#"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                    viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                    <path d={s.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div>
            <h3 className="text-white/50 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
              📚 Assignments
            </h3>
            <ul className="space-y-2">
              {[
                { icon: "📝", label: "Create", href: "/events/create" },
                { icon: "📋", label: "Browse All", href: "/assignments" },
                { icon: "📤", label: "My Submissions", href: "/profile" },
                { icon: "📊", label: "Marks", href: "/marks" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="flex items-center gap-2 text-white/35 hover:text-yellow-300 transition-colors duration-200 text-xs">
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white/50 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
              🔗 Portal
            </h3>
            <ul className="space-y-2">
              {[
                { icon: "🏠", label: "Home", href: "/" },
                { icon: "👨‍🏫", label: "Teachers", href: "/teachers" },
                { icon: "🎓", label: "Students", href: "/students" },
                { icon: "👤", label: "Profile", href: "/profile" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="flex items-center gap-2 text-white/35 hover:text-yellow-300 transition-colors duration-200 text-xs">
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/50 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
              📬 Contact
            </h3>
            <ul className="space-y-2">
              {[
                { icon: "📍", text: "Dhaka, Bangladesh" },
                { icon: "📞", text: "+880 1234-567890" },
                { icon: "✉️", text: "support@assignhub.com" },
                { icon: "🕐", text: "Sat–Thu: 8AM–6PM" }
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <span className="text-xs mt-0.5">{item.icon}</span>
                  <span className="text-white/35 text-xs leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-4"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-[11px]">
            © {new Date().getFullYear()} AssignHub · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {["Terms", "Privacy", "Help"].map((item) => (
              <Link key={item} href="#"
                className="text-white/20 hover:text-yellow-300 text-[11px] transition-colors duration-200">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;