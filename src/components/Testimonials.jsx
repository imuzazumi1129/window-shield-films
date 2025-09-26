import React from "react";

export default function Testimonials({ title = "Reviews", items = [] }) {
  return (
    <section className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">{title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <article key={i} className="rounded-2xl bg-white border shadow-sm p-5">
              <p className="text-neutral-700">{r.text}</p>
              <div className="mt-4 text-sm font-semibold text-neutral-900">— {r.name}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
