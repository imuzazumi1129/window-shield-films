export default function Hero({ title, sub, phone, ctaText }) {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-[500px] flex items-center"
      style={{ backgroundImage: "url('/hero.jpg')" }} // Ensure hero.jpg is in /public
    >
      {/* Dark overlay for contrast */}
      <div className="bg-black/40 absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
          {title}
        </h1>
        <p className="mt-4 md:text-lg text-gray-200 drop-shadow">
          {sub}
        </p>
        <div className="mt-6">
          <a
            href={`tel:${phone.replaceAll("-", "")}`}
            className="rounded-xl bg-white text-blue-700 font-bold px-6 py-3 shadow hover:shadow-lg transition"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
