// src/components/Footer.jsx
import React, { useRef, useState } from "react";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Footer({
  lang = "en",
  phone = "080-2935-4753",
  ownerEn = "Hirose Marco Lucio",
  ownerJp = "広瀬 マルコ ルシオ",
  addressEn = "Hiroshima, Japan",
  addressJp = "広島県",
  email = "imuzazumistudio@gmail.com",
}) {
  const t = lang === "jp" ? jp : en;

  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true); setOk(false); setErr(false);
    try {
      // ← put your EmailJS IDs here
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        { publicKey: "YOUR_PUBLIC_KEY" }
      );
      setOk(true);
      formRef.current.reset();
    } catch {
      setErr(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand & contact */}
        <div>
          <div className="text-white font-extrabold text-lg">Window Shield Films</div>
          <div className="mt-3 space-y-1 text-sm">
            <div>{t.owner}: {lang === "jp" ? ownerJp : ownerEn}</div>
            <div>{t.address}: {lang === "jp" ? addressJp : addressEn}</div>
            <div>
              {t.phone}:{" "}
              <a className="hover:underline" href={`tel:${phone.replaceAll("-","")}`}>{phone}</a>
            </div>
            <div>
              Email:{" "}
              <a className="hover:underline" href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a aria-label="Facebook" href="https://www.facebook.com/imuzazumistudio/" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <Facebook className="w-4 h-4" />
            </a>
            <a aria-label="Instagram" href="https://www.instagram.com/imuzazumi1207" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <Instagram className="w-4 h-4" />
            </a>
            <a aria-label="YouTube" href="https://www.youtube.com/@imuzazumi" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick info */}
        <div>
          <div className="text-white font-semibold">{t.quick}</div>
          <ul className="mt-3 text-sm space-y-2">
            <li>{t.area}</li>
            <li>{t.licensed}</li>
            <li>{t.sameweek}</li>
          </ul>
        </div>

        {/* Contact form */}
        <div>
          <div className="text-white font-semibold">{t.formTitle}</div>
          <form ref={formRef} onSubmit={onSubmit} className="mt-3 space-y-3">
            <input name="name" placeholder={t.name} className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-sm placeholder:text-neutral-400" />
            <input name="email" type="email" placeholder={t.email} className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-sm placeholder:text-neutral-400" />
            <input name="phone" placeholder={t.phoneOpt} className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-sm placeholder:text-neutral-400" />
            <textarea name="message" rows={4} placeholder={t.message} className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-sm placeholder:text-neutral-400" />
            <button type="submit" disabled={sending}
              className={`rounded px-5 py-3 font-semibold text-white ${sending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"}`}>
              {sending ? t.sending : t.send}
            </button>
            {ok && <div className="text-green-400 text-sm">{t.ok}</div>}
            {err && <div className="text-red-400 text-sm">{t.err}</div>}
            <p className="text-xs text-neutral-400">{t.notice}</p>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Window Shield Films. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const en = {
  owner: "Agent",
  address: "Address",
  phone: "Phone",
  quick: "Quick Info",
  area: "Service area: Hiroshima & nearby",
  licensed: "Licensed & insured",
  sameweek: "Same-week appointments available",
  formTitle: "Contact Form",
  name: "Your Name",
  email: "Your Email",
  phoneOpt: "Phone (optional)",
  message: "How can we help?",
  send: "Send Message",
  sending: "Sending…",
  ok: "Thanks! Your message was sent.",
  err: "Oops—something went wrong. Please try again.",
  notice: "By sending, you agree that we may contact you about your inquiry. We do not share your information.",
};

const jp = {
  owner: "担当",
  address: "住所",
  phone: "電話",
  quick: "基本情報",
  area: "対応エリア：広島県周辺",
  licensed: "有資格・保険加入",
  sameweek: "最短で当週の施工も可能",
  formTitle: "お問合せフォーム",
  name: "お名前",
  email: "メールアドレス",
  phoneOpt: "電話番号（任意）",
  message: "ご用件をご記入ください",
  send: "送信する",
  sending: "送信中…",
  ok: "送信が完了しました。ありがとうございます。",
  err: "送信に失敗しました。再度お試しください。",
  notice: "送信により、お問い合わせ内容についてご連絡する場合があります。個人情報は第三者に提供しません。",
};
