import React, { useEffect, useRef, useState } from "react";

export default function BeforeAfter({
  lang = "en",
  before = null,
  after = null,
  combined = null,
  titleEn = "Before & After",
  titleJp = "施工前・施工後",
  noteEn = "Comparison",
  noteJp = "施工前と施工後の比較",
  mode = "side",
  showToggle = true,
  maxHeight = 560,
  sideOrder = "before-after"
}) {
  const title = lang === "jp" ? titleJp : titleEn;
  const note = lang === "jp" ? noteJp : noteEn;

  if (!before || !after) {
    return (
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">{title}</h2>
        {combined ? (
          <img src={combined} alt="Before / After" className="w-full rounded-2xl border shadow-sm" />
        ) : (
          <div className="rounded-2xl border p-6 text-sm text-neutral-600 bg-white">
            {lang === "jp" ? "比較用の画像がありません。" : "No comparison images provided."}
          </div>
        )}
      </div>
    );
  }

  const [uiMode, setUiMode] = useState(mode);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
        {showToggle && (
          <div className="inline-flex rounded-xl border bg-white overflow-hidden text-sm">
            <button
              className={`px-3 py-1 ${uiMode === "side" ? "bg-blue-600 text-white" : "text-neutral-700"}`}
              onClick={() => setUiMode("side")}
            >
              {lang === "jp" ? "並べて表示" : "Side-by-Side"}
            </button>
            <button
              className={`px-3 py-1 border-l ${uiMode === "slider" ? "bg-blue-600 text-white" : "text-neutral-700"}`}
              onClick={() => setUiMode("slider")}
            >
              {lang === "jp" ? "スライダー" : "Slider"}
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-neutral-600 mb-4">{note}</p>

      {uiMode === "slider" ? (
        <SliderView lang={lang} before={before} after={after} maxHeight={maxHeight} />
      ) : (
        <SideBySideView lang={lang} before={before} after={after} sideOrder={sideOrder} />
      )}
    </div>
  );
}

/* -------------------- Side-by-Side -------------------- */
function SideBySideView({ lang, before, after, sideOrder = "before-after" }) {
  const left = sideOrder === "after-before" ? after : before;
  const right = sideOrder === "after-before" ? before : after;

  const leftLabel = sideOrder === "after-before"
    ? (lang === "jp" ? "After（施工後）" : "After")
    : (lang === "jp" ? "Before（施工前）" : "Before");
  const rightLabel = sideOrder === "after-before"
    ? (lang === "jp" ? "Before（施工前）" : "Before")
    : (lang === "jp" ? "After（施工後）" : "After");

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <figure className="rounded-2xl overflow-hidden border bg-white">
        <img src={left} alt={leftLabel} className="w-full h-auto object-contain" />
        <figcaption className="p-2 text-center text-xs md:text-sm bg-black/50 text-white">{leftLabel}</figcaption>
      </figure>
      <figure className="rounded-2xl overflow-hidden border bg-white">
        <img src={right} alt={rightLabel} className="w-full h-auto object-contain" />
        <figcaption className="p-2 text-center text-xs md:text-sm bg-black/50 text-white">{rightLabel}</figcaption>
      </figure>
    </div>
  );
}

/* -------------------- Slider Mode -------------------- */
function SliderView({ lang, before, after, maxHeight }) {
  const containerRef = useRef(null);
  const [ratioPct, setRatioPct] = useState(56);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setRatioPct((img.naturalHeight / img.naturalWidth) * 100);
      }
    };
    img.src = after;
  }, [after]);

  useEffect(() => {
    function onMove(e) {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const next = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
      setPos(next);
    }
    function onUp() { setDragging(false); }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border bg-black/5 select-none touch-none"
      style={{ position: "relative", maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
    >
      <div style={{ paddingTop: `${ratioPct}%` }} />

      <div className="absolute inset-0">
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt="Before" className="h-full w-full object-cover" draggable={false} />
        </div>

        <div className="absolute top-0 bottom-0" style={{ left: `calc(${pos}% - 1px)` }}>
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
          <button
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg border
                       flex items-center justify-center text-lg font-bold"
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
            aria-label={lang === "jp" ? "スライドして比較" : "Drag to compare"}
            title={lang === "jp" ? "スライドして比較" : "Drag to compare"}
          >
            ↔
          </button>
        </div>

        {/* Fixed labels: Left = Before, Right = After */}
        <div className="absolute left-3 top-3 rounded-md bg-black/50 text-white text-xs px-2 py-1">
          {lang === "jp" ? "Before（施工前）" : "Before"}
        </div>
        <div className="absolute right-3 top-3 rounded-md bg-black/50 text-white text-xs px-2 py-1">
          {lang === "jp" ? "After（施工後）" : "After"}
        </div>
      </div>
    </div>
  );
}
