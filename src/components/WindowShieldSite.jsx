<section className="max-w-6xl mx-auto px-4 py-12">
  <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
    {lang === "jp" ? "Before / After" : "Before / After"}
  </h2>

  <figure className="rounded-2xl overflow-hidden border shadow-sm bg-white">
    <img
      src="/before-after-combined.jpg"
      alt={
        lang === "jp"
          ? "窓フィルム施工のビフォーアフター比較。左：施工前、右：施工後。"
          : "Before/After comparison of window film installation. Left: before, right: after."
      }
      loading="lazy"
      className="w-full h-auto block"
      sizes="(max-width: 768px) 100vw, 960px"
    />
    <figcaption className="sr-only">
      {lang === "jp"
        ? "左側は施工前で日差し・まぶしさあり。右側はフィルム施工後で反射・熱・まぶしさが軽減。"
        : "Left is before with glare; right is after with reduced glare/heat due to window film."}
    </figcaption>
  </figure>
</section>
