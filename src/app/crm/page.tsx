"use client";
import Link from "next/link";
import CountUp from "react-countup";
export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-[rgb(207,0,6)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            alt="Interior Design"
            className="w-full h-full object-cover opacity-20 lg:opacity-80"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
          <div className="w-full lg:w-1/2">
            {/* TAG */}
            <div className="inline-block bg-[rgba(255,193,0,0.15)] text-[rgb(255,193,0)] px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6 border border-[rgba(255,193,0,0.4)]">
              BUILT FOR INTERIOR PROFESSIONALS
            </div>
            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Design the space.
              <br />
              <span className="text-[rgb(255,193,0)]">
                We'll handle the business.
              </span>
            </h1>
            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg lg:text-xl text-red-100 mb-8 max-w-xl">
              The all-in-one CRM crafted exclusively for interior designers,
              contractors, and staging companies.
            </p>
            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-[rgb(255,193,0)] text-black px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg font-bold hover:bg-[rgb(230,175,0)] transition text-center shadow-lg"
              >
                Start 2 Months Free
              </Link>
              <Link
                href="#features"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg font-bold hover:bg-white/20 transition text-center"
              >
                Explore Platform
              </Link>
            </div>
            <p className="mt-4 text-sm text-red-100">
              No credit card required. Setup in 2 minutes.
            </p>
          </div>
        </div>
      </section>
      {/* AUTO SLIDER SECTION */}
      <section className="py-14 sm:py-20 bg-white overflow-hidden border-t border-[rgba(207,0,6,0.08)]">
        {/* HEADING */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(207,0,6)] mb-4">
            Designed for Modern Interior Teams
          </h2>
          <p className="text-[rgb(120,90,0)] text-base sm:text-lg max-w-2xl mx-auto">
            Explore inspiring interiors and premium workspaces managed seamlessly with Nterior CRM.
          </p>
        </div>
        {/* SLIDER */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-6 w-max will-change-transform">
            {[
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
              /* DUPLICATE FOR INFINITE LOOP */
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
            ].map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 min-w-70 sm:min-w-95 h-55 sm:h-75 rounded-3xl overflow-hidden shadow-xl group"
              >
                <img
                  src={img}
                  alt="Interior Design"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section
        id="features"
        className="relative py-20 sm:py-28 overflow-hidden bg-linear-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)]"
      >
        {/* BACKGROUND EFFECTS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[rgba(207,0,6,0.08)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[rgba(255,193,0,0.15)] rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[rgba(207,0,6,0.08)] border border-[rgba(207,0,6,0.15)] text-[rgb(207,0,6)] text-sm font-semibold mb-5">
              Complete Interior Business Ecosystem
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[rgb(207,0,6)] leading-tight mb-5">
              One Platform For Your Entire{" "}
              <span className="text-[rgb(255,170,0)]">
                Interior Business Workflow
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[rgb(120,90,0)] leading-relaxed">
              Manage leads, projects, referrals, quotations, designs,
              supervisors, and company operations with powerful role-based
              dashboards built for modern interior firms.
            </p>
          </div>
          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {[
              {
                icon: "🤝",
                title: "Refer & Earn Dashboard",
                text: "Partners and agents can submit leads, monitor lead progress in real-time, and earn commissions after successful bookings.",
                badge: "Referer Panel",
              },
              {
                icon: "📞",
                title: "Sales Admin Dashboard",
                text: "Manage agents, handle leads from calling to booking, track conversions, and generate professional quotation PDFs for clients.",
                badge: "Sales CRM",
              },
              {
                icon: "🎨",
                title: "Designer Dashboard",
                text: "Upload and manage 2D layouts, 3D renders, and client design concepts with organized project collaboration.",
                badge: "Design Studio",
              },
              {
                icon: "🏗️",
                title: "Supervisor Dashboard",
                text: "Track project execution, site work progress, contractor updates, materials, and all operational activities smoothly.",
                badge: "Project Tracking",
              },
              {
                icon: "🛡️",
                title: "Super Admin Control",
                text: "Get complete authority over all company operations, employees, dashboards, projects, leads, commissions, and reports.",
                badge: "Master Control",
              },
              {
                icon: "📄",
                title: "Quotation & PDF System",
                text: "Create branded quotations, project estimates, invoices, and downloadable PDFs instantly for professional client communication.",
                badge: "Automation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/85 backdrop-blur-xl rounded-[30px] p-7 border border-[rgba(255,193,0,0.25)] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* HOVER BACKGROUND */}
                <div className="absolute inset-0 bg-linear-to-br from-[rgba(207,0,6,0.04)] to-[rgba(255,193,0,0.08)] opacity-0 group-hover:opacity-100 transition duration-500"></div>
                {/* TOP BORDER */}
                <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[rgb(207,0,6)] to-[rgb(255,170,0)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* BADGE */}
                  <div className="inline-block mb-5 px-3 py-1 rounded-full bg-[rgba(255,193,0,0.15)] text-[rgb(207,0,6)] text-xs font-bold tracking-wide border border-[rgba(255,193,0,0.25)]">
                    {item.badge}
                  </div>
                  {/* ICON */}
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[rgba(207,0,6,0.12)] to-[rgba(255,193,0,0.2)] flex items-center justify-center text-3xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {/* TITLE */}
                  <h3 className="text-2xl font-bold text-[rgb(207,0,6)] mb-4">
                    {item.title}
                  </h3>
                  {/* DESCRIPTION */}
                  <p className="text-[rgb(120,90,0)] leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                  {/* FOOTER LINK */}
                  <Link
                    href="/explore-features"
                    className="mt-6 inline-flex items-center text-[rgb(207,0,6)] font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300"
                  >
                    Explore Feature
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SHOWCASE */}
      <section className="py-16 sm:py-24 bg-[rgb(255,245,245)] border-t border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* IMAGE */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Designer"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
          {/* CONTENT */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(207,0,6)] mb-6 leading-tight">
              Your entire portfolio & workflow, organized.
            </h2>
            <p className="text-base sm:text-lg text-[rgb(120,90,0)] mb-8 leading-relaxed">
              Nterior gives you enterprise-level operational power in one
              intuitive interface.
            </p>
            <ul className="space-y-4">
              {[
                "Auto-generate material lists",
                "Track profit margins per project",
                "Centralized team communication",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start sm:items-center text-[rgb(207,0,6)] font-medium text-sm sm:text-base"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[rgb(255,193,0)] mr-3 mt-1 sm:mt-0 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* TRUSTED BY */}
      <section className="py-14 bg-white border-t border-[rgba(207,0,6,0.08)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base font-semibold tracking-[0.2em] text-[rgb(120,90,0)] uppercase mb-10">
            Trusted by Interior Brands Worldwide
          </p>
        </div>
        {/* SLIDER WRAPPER */}
        <div className="relative overflow-hidden">
          {/* linear FADE LEFT */}
          <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white to-transparent z-10"></div>
          {/* linear FADE RIGHT */}
          <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-white to-transparent z-10"></div>
          {/* SLIDING TRACK */}
          <div className="flex w-max animate-scroll gap-6 px-4">
            {[
              "UrbanSpace",
              "Decora",
              "InterioLab",
              "BuildCraft",
              "VisionNest",
              "Casa Studio",
              /* DUPLICATE FOR INFINITE LOOP */
              "UrbanSpace",
              "Decora",
              "InterioLab",
              "BuildCraft",
              "VisionNest",
              "Casa Studio",
            ].map((brand, i) => (
              <div
                key={i}
                className="shrink-0 min-w-45 h-20 flex items-center justify-center
    text-center
    bg-[rgb(255,248,220)]
    rounded-2xl
    px-8
    text-[rgb(207,0,6)]
    font-bold
    text-lg
    shadow-sm
    border border-[rgba(255,193,0,0.2)]
    hover:-translate-y-1
    hover:shadow-lg
    transition-all duration-300
  "
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-[rgb(255,245,245)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(207,0,6)] mb-4">
              Simplify Your Entire Workflow
            </h2>
            <p className="text-[rgb(120,90,0)] text-base sm:text-lg max-w-2xl mx-auto">
              From onboarding clients to project delivery — manage everything effortlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Projects",
                text: "Set up projects, assign teams, and organize tasks instantly.",
              },
              {
                step: "02",
                title: "Track Progress",
                text: "Monitor site work, expenses, timelines, and communication.",
              },
              {
                step: "03",
                title: "Deliver Smoothly",
                text: "Generate invoices, approvals, and final reports automatically.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg border border-[rgba(255,193,0,0.25)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[rgb(207,0,6)] text-white flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-[rgb(207,0,6)] mb-4">
                  {item.title}
                </h3>
                <p className="text-[rgb(120,90,0)] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="py-16 bg-[rgb(207,0,6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                value: 500,
                suffix: "+",
                label: "Interior Firms",
              },
              {
                value: 12000,
                suffix: "+",
                label: "Projects Managed",
              },
              {
                value: 8,
                suffix: "M+",
                label: "Invoices Generated",
              },
              {
                value: 98,
                suffix: "%",
                label: "Client Satisfaction",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-[rgb(255,193,0)] mb-3 flex items-center justify-center gap-1">
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={3}
                    separator=","
                    enableScrollSpy
                    scrollSpyDelay={200}
                  >
                    {({ countUpRef }) => (
                      <span ref={countUpRef} />
                    )}
                  </CountUp>
                  <span>{item.suffix}</span>
                </h3>
                <p className="text-white text-sm sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-[rgb(255,193,0)] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(207,0,6)] mb-6 leading-tight">
            Ready to transform your business?
          </h2>
          <p className="text-base sm:text-xl text-[rgb(120,90,0)] mb-10">
            Join top interior firms who have streamlined their workflow.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[rgb(207,0,6)] text-white px-8 sm:px-10 py-4 rounded-xl text-lg sm:text-xl font-bold hover:bg-[rgb(180,0,5)] transition shadow-xl"
          >
            Claim Your Free Trial
          </Link>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* HEADING */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[rgb(207,0,6)] mb-4">
              Loved by Interior Professionals
            </h2>
            <p className="text-[rgb(120,90,0)] text-base sm:text-lg">
              Hear what teams are saying about Nterior CRM.
            </p>
          </div>
        </div>
        {/* SLIDER */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-6 w-max will-change-transform px-4">
            {[
              {
                name: "Sarah Williams",
                role: "Interior Architect",
                text: "Nterior completely transformed how we manage projects and communicate with clients.",
              },
              {
                name: "Michael Roy",
                role: "Renovation Consultant",
                text: "The billing and contractor tracking features save our team hours every week.",
              },
              {
                name: "Ava Interiors",
                role: "Design Studio",
                text: "Beautiful UI, powerful workflow tools, and incredibly easy to use.",
              },
              {
                name: "Daniel Carter",
                role: "Luxury Designer",
                text: "Our workflow became smoother, faster, and much more professional with Nterior.",
              },
              {
                name: "Sophia Buildworks",
                role: "Project Manager",
                text: "From invoices to site tracking — everything is finally in one place.",
              },
              /* DUPLICATE FOR LOOP */
              {
                name: "Sarah Williams",
                role: "Interior Architect",
                text: "Nterior completely transformed how we manage projects and communicate with clients.",
              },
              {
                name: "Michael Roy",
                role: "Renovation Consultant",
                text: "The billing and contractor tracking features save our team hours every week.",
              },
              {
                name: "Ava Interiors",
                role: "Design Studio",
                text: "Beautiful UI, powerful workflow tools, and incredibly easy to use.",
              },
              {
                name: "Daniel Carter",
                role: "Luxury Designer",
                text: "Our workflow became smoother, faster, and much more professional with Nterior.",
              },
              {
                name: "Sophia Buildworks",
                role: "Project Manager",
                text: "From invoices to site tracking — everything is finally in one place.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
            shrink-0
            w-[320px]
            sm:w-95
            bg-[rgb(255,248,220)]
            rounded-3xl
            p-8
            shadow-lg
            border
            border-[rgba(255,193,0,0.3)]
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all
            duration-300
          "
              >
                {/* STARS */}
                <div className="flex text-[rgb(255,193,0)] text-2xl mb-5">
                  ★★★★★
                </div>
                {/* TEXT */}
                <p className="text-[rgb(120,90,0)] leading-relaxed mb-8 text-sm sm:text-base">
                  "{item.text}"
                </p>
                {/* USER */}
                <div>
                  <h4 className="font-bold text-[rgb(207,0,6)] text-lg">
                    {item.name}
                  </h4>
                  <p className="text-sm text-[rgb(120,90,0)]">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}