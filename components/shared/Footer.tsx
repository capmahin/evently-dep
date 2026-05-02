import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-r from-[#0f0c29] via-[#1a1a2e] to-[#16213e]">
      <div className="wrapper py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                Assign<span className="text-yellow-300">Hub</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
              A smart platform for teachers to assign tasks and students to
              submit work — all in one place.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="bg-white/5 hover:bg-yellow-300/10 p-2 rounded-full transition-all duration-300 border border-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/60"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="bg-white/5 hover:bg-yellow-300/10 p-2 rounded-full transition-all duration-300 border border-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/60"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="bg-white/5 hover:bg-yellow-300/10 p-2 rounded-full transition-all duration-300 border border-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/60"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Assignments */}
          <div>
            <h3 className="text-sm font-black text-white mb-4 pb-2 border-b border-white/10 uppercase tracking-widest">
              📚 Assignments
            </h3>
            <ul className="space-y-2">
              {[
                {
                  icon: "📝",
                  label: "Create Assignment",
                  href: "/events/create"
                },
                { icon: "📋", label: "All Assignments", href: "/events" },
                { icon: "📤", label: "My Submissions", href: "/orders" },
                { icon: "✅", label: "Graded Work", href: "/orders" },
                { icon: "⏳", label: "Pending Review", href: "/orders" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black text-white mb-4 pb-2 border-b border-white/10 uppercase tracking-widest">
              🔗 Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { icon: "🏠", label: "Home", href: "/" },
                { icon: "🎓", label: "Student Portal", href: "/orders" },
                { icon: "👨‍🏫", label: "Teacher Dashboard", href: "/profile" },
                { icon: "📊", label: "Results", href: "/orders" },
                { icon: "👤", label: "My Profile", href: "/profile" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-black text-white mb-4 pb-2 border-b border-white/10 uppercase tracking-widest">
              📬 Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-base">📍</span>
                <span className="text-white/50 text-sm">
                  123 School Street, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">📞</span>
                <span className="text-white/50 text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">✉️</span>
                <span className="text-white/50 text-sm">
                  support@assignhub.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">🕐</span>
                <span className="text-white/50 text-sm">
                  Sat – Thu: 8:00 AM – 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-sm">
            © 2024 AssignHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-white/30 hover:text-yellow-300 text-sm transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-white/30 hover:text-yellow-300 text-sm transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white/30 hover:text-yellow-300 text-sm transition-colors duration-300"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
