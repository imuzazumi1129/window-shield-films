// src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Sun,
  Shield,
  Eye,
  Lock,
  Sparkles,
  Phone,
  Calculator,
  JapaneseYen,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

import Hero from "./components/Hero";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import LangGallery from "./components/LangGallery";
import InstagramSection from "./components/InstagramSection";
import Footer from "./components/Footer";

/* ---------------------- Data & Constants ---------------------- */
const FILMS = [
  {
    key: "heat",
    icon: Sun,
    en: {
      title: "Heat-Shielding Film",
      bullets: [
        "Blocks direct sunlight & reduces indoor heat",
        "Protects furniture & flooring from UV rays",
        "Saves energy by reducing A/C usage",
      ],
    },
    jp: {
      title: "遮熱フィルム",
      bullets: [
        "直射日光を遮り、室内の温度上昇を軽減",
        "家具や床を紫外線から保護",
        "エアコン使用を減らし、省エネ効果",
      ],
    },
    images: ["/gallery/heat-1.jpg", "/gallery/heat-2.jpg", "/gallery/heat-3.jpg"],
    pricePerM2: 13000,
    color: "from-amber-50 to-yellow-50",
  },
  {
    key: "anti",
    icon: Shield,
    en: {
      title: "Anti-Shatter Film",
      bullets: [
        "Prevents glass fragments from scattering",
        "Safety during earthquakes, typhoons, or accidents",
        "Essential for homes & storefronts",
      ],
    },
    jp: {
      title: "飛散防止フィルム",
      bullets: [
        "ガラス破片の飛び散りを防止",
        "地震・台風・事故時の安全性向上",
        "家庭や店舗に最適",
      ],
    },
    images: ["/gallery/anti-1.jpg", "/gallery/anti-2.jpg"],
    pricePerM2: 10000,
    color: "from-sky-50 to-blue-50",
  },
  {
    key: "privacy",
    icon: Eye,
    en: {
      title: "Privacy (Blindfold) Film",
      bullets: [
        "Lets in natural light while protecting privacy",
        "Many designs & colors available",
        "Half-window coverage option",
      ],
    },
    jp: {
      title: "目隠し（プライバシー）フィルム",
      bullets: [
        "自然光を取り入れつつプライバシーを確保",
        "多彩なデザイン・カラーをご用意",
        "窓の半分だけの施工も可能",
      ],
    },
    images: ["/gallery/privacy-1.jpg", "/gallery/privacy-2.jpg"],
    pricePerM2: 12000,
    color: "from-rose-50 to-pink-50",
  },
  {
    key: "crime",
    icon: Lock,
    en: {
      title: "Crime Prevention Film",
      bullets: [
        "Strengthens glass & resists break-ins",
        "Hard to shatter, even with a hammer",
        "Keeps your home safe and secure",
      ],
    },
    jp: {
      title: "防犯フィルム",
      bullets: [
        "ガラスを強化し、侵入を防止",
        "ハンマーでも割れにくい高強度",
        "住まいを安全・安心に保つ",
      ],
    },
    images: ["/gallery/crime-1.jpg", "/gallery/crime-2.jpg"],
    pricePerM2: 15000,
    color: "from-indigo-50 to-violet-50",
  },
  {
    key: "uv",
    icon: Sparkles,
    en: {
      title: "UV-Cut Film (99% UV Block)",
      bullets: [
        "Blocks 99% of harmful UV rays",
        "Prevents discoloration of furniture",
        "Protects skin & even pets",
      ],
    },
    jp: {
      title: "UVカットフィルム（99%カット）",
      bullets: [
        "有害な紫外線を99%カット",
        "家具の色あせを防止",
        "お肌やペットも守ります",
      ],
    },
    images: ["/gallery/uv-1.jpg", "/gallery/uv-2.jpg"],
    pricePerM2: 10000,
    color: "from-emerald-50 to-green-50",
  },
];

const PHONE = "080-2935-4753";
const OWNER_EN = "Hirose Marco Lucio";
const OWNER_JP = "広瀬 マルコ ルシオ";

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

/* --------------------------- Component --------------------------- */
function WindowShieldSite() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => (lang === "jp" ? jpText : enText), [lang]);

  // Calculator (film-only)
  const [filmKey, setFilmKey] = useState(FILMS[0].key);
  const [width, setWidth] = useState(1.0);
  const [height, setHeight] = useState(1.0);

  const film = FILMS.find((f) => f.key === filmKey) || FILMS[0];
  const area = Math.max(0, Number(width)) * Math.max(0, Number(height));
  const base = film.pricePerM2 * area;
  const total = Number.isFinite(base) ? Math.round(base) : 0;

  // Testimonials
  const testimonialsEN = [
    {
      name: "Sato R.",
      text: "Heat-shield film lowered our summer electric bill. Clean install!",
    },
    {
      name: "Mika T.",
      text: "Privacy film means no more daytime curtains. The room stays bright.",
    },
    {
      name: "Kenji I.",
      text: "Security film gives us peace of mind. Family is happy with it.",
    },
  ];
  const testimonialsJP = [
    {
      name: "佐藤 R.",
      text: "遮熱フィルムで夏の電気代が下がりました。施工も丁寧！",
    },
    {
      name: "ミカ T.",
      text: "目隠しフィルムで日中もカーテン不要に。部屋が明るいままです。",
    },
    {
      name: "健司 I.",
      text: "防犯フィルムで安心感がアップ。家族も喜んでいます。",
    },
  ];

  /* ---------------- Lightbox state ---------------- */
  const [lbOpen, setLbOpen] = useState(false);
  const [lbFilmIdx, setLbFilmIdx] = useState(0);
  const [lbImgIdx, setLbImgIdx] = useState(0);

  function openLightbox(filmIndex, imageIndex = 0) {
    setLbFilmIdx(filmIndex);
    setLbImgIdx(imageIndex);
    setLbOpen(true);
  }
  function nextImg() {
    const imgs = FILMS[lbFilmIdx]?.images || [];
    if (!imgs.length) return;
    setLbImgIdx((i) => (i + 1) % imgs.length);
  }
  function prevImg() {
    const imgs = FILMS[lbFilmIdx]?.images || [];
    if (!imgs.length) return;
    setLbImgIdx((i) => (i - 1 + imgs.length) % imgs.length);
  }

  useEffect(() => {
    function onKey(e) {
      if (!lbOpen) return;
      if (e.key === "Escape") setLbOpen(false);
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen]);

  return (
    <>
      {/* ===== MAIN PAGE ===== */}
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        {/* Nav */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-extrabold text-xl tracking-tight">
              Window Shield Films
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang("en")}
                className={classNames(
                  "px-3 py-1 rounded-full text-sm border",
                  lang === "en"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-neutral-300"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang("jp")}
                className={classNames(
                  "px-3 py-1 rounded-full text-sm border",
                  lang === "jp"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-neutral-300"
                )}
              >
                日本語
              </button>
              <a
                href={`tel:${PHONE.replaceAll("-", "")}`}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 font-semibold shadow"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <Hero title={t.heroTitle} sub={t.heroSub} phone={PHONE} ctaText={t.ctaCall} />

        {/* Products */}
        <motion.section
          id="films"
          className="max-w-6xl mx-auto px-4 py-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            {t.sectionFilms}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FILMS.map((f, fi) => (
              <article
                key={f.key}
                className="rounded-2xl border shadow-sm overflow-hidden bg-white"
              >
                <div className={classNames("h-2 w-full bg-gradient-to-r", f.color)} />
                {f.images?.[0] && (
                  <button
                    type="button"
                    onClick={() => openLightbox(fi, 0)}
                    className="w-full aspect-[4/3] overflow-hidden block group"
                  >
                    <img
                      src={f.images[0]}
                      alt={(lang === "jp" ? f.jp.title : f.en.title) + " sample"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl p-2 bg-neutral-100">
                      <f.icon className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-extrabold">
                      {lang === "jp" ? f.jp.title : f.en.title}
                    </h3>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {(lang === "jp" ? f.jp.bullets : f.en.bullets).map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 font-bold text-blue-700 flex items-center gap-2">
                    <JapaneseYen className="w-4 h-4" />
                    {f.pricePerM2.toLocaleString()} / m²
                    <span className="text-neutral-500 font-normal">
                      {" · "}
                      {lang === "jp"
                        ? "諸経費あり（総額はお問い合わせください）"
                        : "misc fee may apply (contact for final total)"}
                    </span>
                  </div>

                  {f.images?.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                      {f.images.slice(0, 4).map((src, ti) => (
                        <button
                          key={ti}
                          onClick={() => openLightbox(fi, ti)}
                          className="h-14 w-20 flex-none overflow-hidden rounded-lg border"
                          title="View larger"
                          type="button"
                        >
                          <img
                            src={src}
                            alt={`thumb-${ti}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <LangGallery
            lang={lang}
            titleEn="Our Film Lineup – Gallery"
            titleJp="取扱いフィルム ギャラリー"
          />
        </section>

        {/* Before/After */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <BeforeAfter
            lang={lang}
            before="/before-after/before.jpg"
            after="/before-after/after.jpg"
            mode="side"
            showToggle={true}
            sideOrder="before-after"
            sliderBase="after"
          />
        </section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 py-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            {lang === "jp" ? "おすすめポイント" : "Why Choose Us"}
          </h2>
          {(() => {
            const items =
              lang === "jp"
                ? [
                    { title: "プロ施工", desc: "専門スタッフが丁寧に施工。" },
                    { title: "高品質フィルム", desc: "高品質フィルムのみを使用。" },
                    { title: "スピード対応", desc: "最短で当週施工も可能。" },
                  ]
                : [
                    { title: "Pro Installation", desc: "Experienced technicians install with care." },
                    { title: "Quality Films", desc: "We use premium-grade films only." },
                    { title: "Quick Scheduling", desc: "Same-week appointments available." },
                  ];
            return (
              <div className="grid md:grid-cols-3 gap-6">
                {items.map((it, i) => (
                  <div key={i} className="rounded-2xl bg-white border shadow-sm p-5">
                    <h3 className="font-bold">{it.title}</h3>
                    <p className="text-sm text-neutral-700 mt-1">{it.desc}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </motion.section>

        {/* Testimonials */}
        <Testimonials
          title={lang === "jp" ? "お客様の声" : "Customer Reviews"}
          items={lang === "jp" ? testimonialsJP : testimonialsEN}
        />

        {/* Calculator */}
        <section id="calculator" className="bg-white border-t border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              {t.sectionCalc}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl border p-5 bg-neutral-50">
                <label className="block text-sm font-semibold mb-1">{t.chooseFilm}</label>
                <select
                  value={filmKey}
                  onChange={(e) => setFilmKey(e.target.value)}
                  className="w-full rounded-lg border p-3 bg-white"
                >
                  {FILMS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {lang === "jp" ? f.jp.title : f.en.title}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t.width}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full rounded-lg border p-3"
                    />
                    <p className="text-xs text-neutral-500 mt-1">{t.meters}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t.height}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full rounded-lg border p-3"
                    />
                    <p className="text-xs text-neutral-500 mt-1">{t.meters}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border p-5 bg-white shadow-sm">
                <div className="text-sm text-neutral-500">{t.summary}</div>
                <div className="mt-2 text-lg font-bold">
                  {lang === "jp" ? film.jp.title : film.en.title}
                </div>
                <div className="mt-1 text-sm">
                  {t.area}: <span className="font-semibold">{area.toFixed(2)} m²</span>
                </div>
                <div className="mt-1 text-sm">
                  {t.pricePerM2}:{" "}
                  <span className="font-semibold">¥{film.pricePerM2.toLocaleString()}</span>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-blue-700">
                  ¥{total.toLocaleString()}
                </div>
                <div className="mt-2 text-xs text-neutral-600">
                  {lang === "jp"
                    ? "※ 上記はフィルム費用のみの概算です。諸経費が別途かかる場合があります。最終金額はお問い合わせください。"
                    : "* Estimate includes film only. A miscellaneous fee may apply. Contact us for the final total."}
                </div>
                <a
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold shadow"
                  href={`tel:${PHONE.replaceAll("-", "")}`}
                >
                  <Phone className="w-4 h-4" />
                  {t.ctaCall}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram (above footer) */}
        <InstagramSection lang={lang} />

        {/* Footer */}
        <Footer
          lang={lang}
          phone={PHONE}
          ownerEn={OWNER_EN}
          ownerJp={OWNER_JP}
          addressEn="Hiroshima, Japan"
          addressJp="広島県"
          email="imuzazumistudio@gmail.com"
        />
      </div>

      {/* ===== LIGHTBOX OVERLAY (kept inside the same return) ===== */}
      {lbOpen && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLbOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.98, y: 8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const f = FILMS[lbFilmIdx] || {};
              const imgs = f.images || [];
              const title = lang === "jp" ? f.jp?.title : f.en?.title;
              return (
                <>
                  <div className="relative overflow-hidden rounded-2xl bg-black">
                    <img
                      src={imgs[lbImgIdx]}
                      alt="detail"
                      className="w-full max-h-[78vh] object-contain bg-black"
                    />
                    <button
                      type="button"
                      onClick={() => setLbOpen(false)}
                      className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold shadow"
                    >
                      Close
                    </button>
                    {imgs.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImg}
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
                          aria-label="Prev"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={nextImg}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
                          aria-label="Next"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {imgs.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {imgs.map((src, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setLbImgIdx(i)}
                          className={`h-16 w-24 flex-none overflow-hidden rounded-lg border ${
                            i === lbImgIdx
                              ? "ring-2 ring-blue-500 border-blue-500"
                              : "border-white/30"
                          }`}
                        >
                          <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 text-white/90 text-sm">
                    {title} · {lbImgIdx + 1}/{imgs.length || 1}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default WindowShieldSite;

/* ---------------------------- i18n text ---------------------------- */
const enText = {
  heroTitle: "Protect Your Home. Save Energy. Stay Comfortable.",
  heroSub: "Professional installation of premium window films across Hiroshima & nearby areas.",
  ctaCall: "Call for Free Consultation",
  ctaCalc: "Estimate Price",
  sectionFilms: "Our Film Lineup",
  sectionCalc: "Quick Price Estimator",
  chooseFilm: "Choose a film",
  width: "Width",
  height: "Height",
  meters: "meters (m)",
  summary: "Your estimate",
  area: "Area",
  pricePerM2: "Price per m²",
  footerTitle: "Ready to upgrade your windows?",
  footerSub: "Same-week scheduling available. Licensed & insured.",
};

const jpText = {
  heroTitle: "住まいを守り、省エネで快適に。",
  heroSub: "広島県周辺で窓用フィルムの施工をプロが担当します。",
  ctaCall: "無料相談に電話する",
  ctaCalc: "料金を見積もる",
  sectionFilms: "取扱いフィルム",
  sectionCalc: "かんたん料金シミュレーター",
  chooseFilm: "フィルムを選択",
  width: "横幅",
  height: "高さ",
  meters: "メートル（m）",
  summary: "見積もり",
  area: "面積",
  pricePerM2: "1㎡あたりの価格",
  footerTitle: "窓まわりをグレードアップしませんか？",
  footerSub: "最短で当週の施工も可能。安心の有資格・保険加入。",
};
