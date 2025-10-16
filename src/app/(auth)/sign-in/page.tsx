"use client";

import { SignInForm } from "@/components/SignInForm";

const SignInPage = () => {
  return (
    <section className="w-full h-screen flex overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <div className="relative z-10 ">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-600/10 mb-6">
            <span className="text-2xl font-bold text-blue-600">P</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 leading-tight font-sans">PostBoy</h1>
          <p className="text-slate-400 text-lg">API Testing & Collaboration</p>
        </div>

        <div className="space-y-8 relative z-10">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Why PostBoy?</h2>
            <ul className="space-y-4">
              {[
                "Powerful API testing and debugging tools",
                "Collaborate with your team in real-time",
                "Save and organize your requests",
                "Automated testing and monitoring",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-slate-500 text-xs relative z-10">© 2025 PostBoy. All rights reserved.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <SignInForm />
      </div>
    </section>
  );
};

export default SignInPage;
