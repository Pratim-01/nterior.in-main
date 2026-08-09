import Link from "next/link";
export default function ExploreFeaturesPage() {
  const features = [
    {
      icon: "🤝",
      title: "Refer & Earn Dashboard",
      subtitle: "Grow your business network with referral partners",
      description:
        "Referral partners and agents can easily submit leads, track lead progress in real-time, and monitor booking status directly from their dashboard.",
      points: [
        "Share leads instantly from dashboard",
        "Track lead status from inquiry to booking",
        "Monitor commission earnings",
        "Referral-wise performance analytics",
        "Real-time booking updates",
      ],
    },
    {
      icon: "📞",
      title: "Sales Admin Dashboard",
      subtitle: "Complete lead and sales management system",
      description:
        "Sales admins can manage all referral agents, track customer leads, handle follow-ups, schedule calls, and manage the entire sales process until final booking.",
      points: [
        "Manage all referers and agents",
        "Lead assignment and tracking",
        "Call and follow-up management",
        "Booking and conversion monitoring",
        "Generate quotation PDFs for clients",
        "Client communication management",
      ],
    },
    {
      icon: "🎨",
      title: "Designer Dashboard",
      subtitle: "Professional design collaboration platform",
      description:
        "Interior designers can upload and manage 2D layouts, 3D renders, mood boards, and design files for every client project in one organized place.",
      points: [
        "Upload 2D layouts and plans",
        "Upload 3D renders and walkthroughs",
        "Client-wise design management",
        "Design revision tracking",
        "Centralized project collaboration",
      ],
    },
    {
      icon: "🏗️",
      title: "Supervisor Dashboard",
      subtitle: "Smart project execution management",
      description:
        "Supervisors can efficiently monitor project execution, track site activities, manage contractor work, and oversee materials and daily operational tasks.",
      points: [
        "Site progress tracking",
        "Contractor management",
        "Material tracking",
        "Daily work updates",
        "Project activity monitoring",
      ],
    },
    {
      icon: "🛡️",
      title: "Super Admin Dashboard",
      subtitle: "Complete company operation control",
      description:
        "Super admins have full access and authority over the entire company ecosystem including employees, projects, dashboards, commissions, reports, and operations.",
      points: [
        "Manage all dashboards and users",
        "Monitor company-wide operations",
        "Access business analytics and reports",
        "Control projects and workflows",
        "Manage commissions and accounts",
      ],
    },
    {
      icon: "📄",
      title: "Quotation & PDF Automation",
      subtitle: "Professional quotation generation system",
      description:
        "Generate branded quotation PDFs, project estimates, invoices, and downloadable documents instantly for seamless client communication.",
      points: [
        "Generate professional quotations",
        "Download PDF estimates instantly",
        "Custom branded company documents",
        "Invoice generation support",
        "Easy client sharing",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[rgba(207,0,6,0.08)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[rgba(255,193,0,0.15)] rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-[rgba(207,0,6,0.08)] border border-[rgba(207,0,6,0.15)] text-[rgb(207,0,6)] font-semibold text-sm mb-6">
            Powerful Interior Business SaaS Platform
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[rgb(207,0,6)] leading-tight max-w-5xl mx-auto mb-6">
            Complete Business Management Platform For Modern Interior Companies
          </h1>

          <p className="text-base sm:text-xl text-[rgb(120,90,0)] max-w-3xl mx-auto leading-relaxed">
            Manage your leads, referral partners, project execution, quotations,
            designers, supervisors, and company operations from one centralized
            and intelligent dashboard ecosystem.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/85 backdrop-blur-xl rounded-4xl p-8 border border-[rgba(255,193,0,0.25)] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* HOVER EFFECT */}
              <div className="absolute inset-0 bg-linear-to-br from-[rgba(207,0,6,0.04)] to-[rgba(255,193,0,0.08)] opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* TOP BORDER */}
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[rgb(207,0,6)] to-[rgb(255,170,0)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-[rgba(207,0,6,0.12)] to-[rgba(255,193,0,0.2)] flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {feature.icon}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-[rgb(207,0,6)] mb-2">
                      {feature.title}
                    </h2>

                    <p className="text-[rgb(255,140,0)] font-semibold text-sm sm:text-base">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-[rgb(120,90,0)] leading-relaxed text-base mb-7">
                  {feature.description}
                </p>

                <div className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-[rgba(255,248,220,0.7)] rounded-2xl p-4 border border-[rgba(255,193,0,0.15)]"
                    >
                      <div className="w-7 h-7 rounded-full bg-[rgb(207,0,6)] text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                        ✓
                      </div>

                      <p className="text-[rgb(120,90,0)] leading-relaxed text-sm sm:text-base">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-[36px] bg-linear-to-r from-[rgb(207,0,6)] to-[rgb(255,140,0)] p-10 sm:p-16 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Simplify Your Entire Interior Business Workflow
          </h2>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            From referral lead generation to project execution and company-wide
            operations, our platform helps you automate and scale your interior
            business with ease.
          </p>

          <Link href="/register">
            <button className="bg-white text-[rgb(207,0,6)] font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
