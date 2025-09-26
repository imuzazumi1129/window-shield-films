import React, { useEffect, useMemo, useRef, useState } from "react";

// Images (keep your lists)
const IMAGES = {
  en: ["/images/en/1.jpg","/images/en/2.jpg","/images/en/3.jpg","/images/en/4.jpg","/images/en/5.jpg"],
  jp: ["/images/jp/1.jpg","/images/jp/2.jpg","/images/jp/3.jpg","/images/jp/4.jpg","/images/jp/5.jpg"],
};

/* ---- sizing/spacing knobs ---- */
const CARD_WIDTH  = 384;  // px (e.g., 384, 416)
const CARD_HEIGHT = 288;  // px (e.g., 288, 320)
const GAP         = 24;   // px gap between cards
const DURATION_SEC = 20;  // time to move one loop (lower -> faster)

export default function LangGallery({ lang = "en", titleEn, titleJp }) {
  const list  = lang === "jp" ? IMAGES.jp : IMAGES.en;
  const title = lang === "jp" ? (titleJp ?? "用途・シーン別") : (titleEn ?? "Use Cases / Scenes");

  // half-track width (we duplicate items to loop seamlessly)
  const HALF = useMemo(() => (CARD_WIDTH + GAP) * list.length, [list.length]);

  const [paused, setPaused] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">{title}</h2>

      {/* Inject a keyframe that uses the computed HALF width */}
      <style>{`
        @keyframes marqueeX {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${HALF}px); }
        }
      `}</style>

      {/* Viewport */}
      <div
        className="relative overflow-hidden rounded-3xl bg-transparent"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        style={{ paddingRight: GAP / 2 }}
      >
        {/* Track (duplicated list for seamless wrap) */}
        <div
          className="flex will-change-transform"
          style={{
            gap: `${GAP}px`,
            animationName: "marqueeX",
            animationTimingFunction: "linear",
            animationDuration: `${DURATION_SEC}s`,
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[...list, ...list].map((src, i) => (
            <Card key={`${src}-${i}`} src={src} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ src, lang }) {
  return (
    <figure
      className="relative shrink-0 rounded-3xl overflow-hidden bg-white shadow-sm"
      style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
    >
      {/* Full image preserved (no crop) */}
      <img
        src={src}
        alt={lang === "jp" ? "ギャラリー画像" : "Gallery image"}
        className="w-full h-full object-contain p-2"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
