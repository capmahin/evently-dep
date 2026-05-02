import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">
            Welcome to <span className="text-yellow-300">AssignHub</span>
          </h1>
          <p className="text-white/40 text-sm">Sign in to continue</p>
        </div>
        <SignIn
          afterSignInUrl="/role-select"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-[#1a1a2e] border border-white/10 shadow-2xl rounded-2xl",
              headerTitle: "text-white font-black",
              headerSubtitle: "text-white/40",
              socialButtonsBlockButton: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
              socialButtonsBlockButtonText: "text-white/80",
              dividerLine: "bg-white/10",
              dividerText: "text-white/30",
              formFieldLabel: "text-white/60 text-xs uppercase tracking-widest",
              formFieldInput: "bg-white/5 border border-white/10 text-white rounded-xl",
              formButtonPrimary: "bg-yellow-300 text-black font-black hover:bg-yellow-400 rounded-xl",
              footerActionLink: "text-yellow-300 hover:text-yellow-400",
              footerActionText: "text-white/40",
              alertText: "text-red-400",
            },
            layout: { logoPlacement: "none" }
          }}
        />
      </div>
    </div>
  );
}