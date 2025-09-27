import React from "react";

export default function InstagramSection({ lang }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
        {lang === "jp" ? "Instagram 最新投稿" : "Latest on Instagram"}
      </h2>
      <div className="rounded-2xl overflow-hidden shadow-sm flex justify-center">
        <iframe
          src="https://snapwidget.com/embed/1108824" // your SnapWidget embed URL
          title="Instagram Feed"
          className="snapwidget-widget"
          allowTransparency={true}
          frameBorder="0"
          scrolling="no"
          style={{
            border: "none",
            overflow: "hidden",
            width: "100%",
            maxWidth: "765px",
            height: "510px",
          }}
        ></iframe>
      </div>
    </section>
  );
}
