export default function HomePage() {
  return (
    <main className="bg-black text-white">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Build. Scale. Launch.
        </h1>
        <p className="text-gray-400 max-w-2xl mb-8">
          A modern full-stack platform built with Next.js, MongoDB, and industry-standard
          backend architecture to manage services, products, blogs, and case studies.
        </p>
        <div className="flex gap-4">
          <a
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Admin Dashboard
          </a>
          <a
            href="#services"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Web Development", "API Design", "Admin Systems"].map((service) => (
            <div
              key={service}
              className="border border-gray-700 p-6 rounded-xl hover:border-blue-600 transition"
            >
              <h3 className="text-xl font-semibold mb-3">{service}</h3>
              <p className="text-gray-400">
                Scalable, secure and production-ready solutions designed for real-world use.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Case Studies
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="border border-gray-700 p-6 rounded-xl hover:border-green-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                Case Study {item}
              </h3>
              <p className="text-gray-400">
                Solving real business problems with clean architecture and scalable backend systems.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Latest Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-gray-700 p-6 rounded-xl hover:border-purple-500 transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                Blog Post {item}
              </h3>
              <p className="text-gray-400">
                Insights on system design, backend patterns, and full-stack development.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Explore the System?
        </h2>
        <p className="mb-8 text-white/80">
          Access the admin dashboard to manage content with full CRUD functionality.
        </p>
        <a
          href="/admin"
          className="bg-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-900"
        >
          Go to Admin Panel
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Full-Stack Admin Platform · Built with Next.js & MongoDB
      </footer>

    </main>
  );
}
