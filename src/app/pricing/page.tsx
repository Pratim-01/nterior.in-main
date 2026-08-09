import Link from "next/link";
export default function Pricing() {
  return (
    <main className="bg-gradient-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <span className="inline-flex px-5 py-2 rounded-full bg-[rgba(207,0,6,0.08)] text-[rgb(207,0,6)] font-semibold border border-[rgba(207,0,6,0.15)]">
          Transparent Pricing
        </span>
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-[rgb(207,0,6)]">
          60 Days Free.
          <br />
          Then Continue With A Subscription.
        </h1>
        <p className="mt-8 text-xl text-[rgb(120,90,0)] max-w-3xl mx-auto leading-relaxed">
          Experience the complete Nterior CRM ecosystem free for
          60 days with no restrictions. Manage leads, projects,
          sales teams, supervisors, quotations and business
          operations from one platform.
        </p>
      </section>
      {/* MAIN CARD */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] border border-[rgba(255,193,0,0.25)] shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[rgb(207,0,6)] to-[rgb(255,140,0)] p-8 text-white text-center">
            <h2 className="text-4xl font-extrabold">
              Nterior CRM
            </h2>
            <p className="mt-3 text-white/90">
              Complete Business Management Platform
            </p>
          </div>
          <div className="p-10">
            <div className="text-center mb-10">
              <div className="text-6xl font-extrabold text-[rgb(207,0,6)]">
                FREE
              </div>
              <p className="text-xl text-slate-500 mt-3">
                For the first 60 days
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                "1 Super Admin Dashboard",
                "2 Sales Admin Dashboards",
                "1 Supervisor Dashboard",
                "Lead Management",
                "Project Management",
                "Quotation System",
                "Commission Tracking",
                "Attendance Management",
                "Vendor Management",
                "Reporting & Analytics",
                "Role Based Access",
                "Cloud Access"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[rgba(255,193,0,0.08)]"
                >
                  <span className="text-green-600 font-bold text-xl">
                    ✓
                  </span>
                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="mb-6">
                <span className="text-slate-500">
                  After 60 days continue with
                </span>
                <div className="text-4xl font-extrabold text-[rgb(207,0,6)] mt-2">
                  Subscription Plan
                </div>
                <p className="text-slate-500 mt-2">
                  Pricing will be based on your selected business plan.
                </p>
              </div>
              <Link href="/register">
                <button className="px-10 py-4 rounded-2xl bg-[rgb(207,0,6)] text-white font-bold text-lg hover:scale-105 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}