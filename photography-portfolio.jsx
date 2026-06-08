import { useState, useEffect, useRef } from "react";

const photos = [
  { id: 1, category: "wedding", title: "Golden Vows", location: "Udaipur, Rajasthan", aspect: "portrait", color: "#c4a882" },
  { id: 2, category: "portrait", title: "Soft Light", location: "Mumbai Studio", aspect: "square", color: "#b89a72" },
  { id: 3, category: "wedding", title: "First Dance", location: "Jaipur Palace", aspect: "landscape", color: "#d4b896" },
  { id: 4, category: "portrait", title: "Golden Hour", location: "Delhi Gardens", aspect: "portrait", color: "#a08060" },
  { id: 5, category: "wedding", title: "Sacred Rituals", location: "Varanasi Ghats", aspect: "square", color: "#c8a878" },
  { id: 6, category: "portrait", title: "Bridal Glow", location: "Goa Beachfront", aspect: "landscape", color: "#b8906a" },
  { id: 7, category: "wedding", title: "Mandap Moments", location: "Chennai Temple", aspect: "portrait", color: "#d0b088" },
  { id: 8, category: "portrait", title: "Timeless", location: "Bangalore Studio", aspect: "square", color: "#a87850" },
  { id: 9, category: "wedding", title: "Joy Unscripted", location: "Kolkata Heritage", aspect: "landscape", color: "#c09870" },
];

const testimonials = [
  { name: "Priya & Arjun", text: "Every frame tells our story. We cry happy tears every time we look at these photos.", location: "Delhi Wedding" },
  { name: "Meera Kapoor", text: "The portrait session was magical. She captured my soul, not just my face.", location: "Mumbai Portrait" },
  { name: "Sunita & Vikram", text: "Our families still talk about how beautiful the wedding album is. Pure artistry.", location: "Jaipur Wedding" },
];

const packages = [
  { name: "Essence", price: "₹45,000", desc: "Half-day coverage", features: ["4 hours", "200+ edited images", "Online gallery", "1 photographer"] },
  { name: "Forever", price: "₹85,000", desc: "Full wedding day", features: ["10 hours", "500+ edited images", "Premium album", "2 photographers"], featured: true },
  { name: "Legacy", price: "₹1,40,000", desc: "Complete experience", features: ["2 days coverage", "800+ edited images", "Luxury album", "Engagement shoot"] },
];

function PhotoCard({ photo, onClick }) {
  const heights = { portrait: "320px", landscape: "200px", square: "260px" };
  return (
    <div
      onClick={() => onClick(photo)}
      style={{
        position: "relative",
        height: heights[photo.aspect],
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        background: photo.color,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${photo.color}dd 0%, ${photo.color}88 50%, ${photo.color}44 100%)`,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "20px",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.15) 0%, transparent 50%)`,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", margin: "0 0 4px", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{photo.location}</p>
          <h3 style={{ fontSize: "20px", color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>{photo.title}</h3>
        </div>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.2)",
        opacity: 0,
        transition: "opacity 0.3s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }} className="overlay">
        <span style={{ color: "#fff", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase" }}>View</span>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter === "all" ? photos : photos.filter(p => p.category === filter);

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: "#faf6f0", color: "#2c2218", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .overlay:hover { opacity: 1 !important; }
        .photo-card:hover .overlay { opacity: 1; }
        .nav-link { color: #6b4f35; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
        .nav-link:hover { color: #2c2218; }
        .filter-btn { background: none; border: 1px solid #c4a882; color: #6b4f35; padding: 8px 24px; cursor: pointer; font-family: 'Lato', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; border-radius: 0; }
        .filter-btn:hover, .filter-btn.active { background: #6b4f35; color: #faf6f0; border-color: #6b4f35; }
        .pkg-card { background: #fff; border: 1px solid #e8ddd0; padding: 40px 32px; flex: 1; min-width: 220px; transition: transform 0.3s; }
        .pkg-card:hover { transform: translateY(-4px); }
        .pkg-featured { background: #6b4f35; color: #faf6f0; border-color: #6b4f35; }
        .social-link { color: #c4a882; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
        .social-link:hover { color: #6b4f35; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.8s ease forwards; }
        @keyframes heroText { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .hero-text { animation: heroText 1.2s ease forwards; }
        .hero-sub { animation: heroText 1.2s 0.3s ease both; }
        .hero-cta { animation: heroText 1.2s 0.6s ease both; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 60px",
        background: scrollY > 60 ? "rgba(250,246,240,0.96)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(8px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid #e8ddd0" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#2c2218", letterSpacing: "2px" }}>
          Ananya <span style={{ fontStyle: "italic", color: "#c4a882" }}>Sharma</span>
        </div>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {["Portfolio", "About", "Packages", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        height: "100vh", position: "relative", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #2c2218 0%, #4a3020 40%, #6b4f35 100%)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(196,168,130,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(196,168,130,0.08) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "45%",
          background: "linear-gradient(135deg, #c4a88266 0%, #a0805044 50%, transparent 100%)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 1, padding: "0 60px 0 80px", maxWidth: "700px" }}>
          <p className="hero-sub" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "24px" }}>
            Wedding & Portrait Photography
          </p>
          <h1 className="hero-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 7vw, 88px)", fontWeight: 300, color: "#faf6f0", lineHeight: 1.05, marginBottom: "28px" }}>
            Moments that<br /><em style={{ color: "#c4a882" }}>live forever</em>
          </h1>
          <p className="hero-sub" style={{ fontSize: "16px", color: "rgba(250,246,240,0.65)", fontWeight: 300, lineHeight: 1.8, marginBottom: "48px", maxWidth: "460px" }}>
            I capture the warmth, the tears, the quiet glances — the real story behind your most sacred day.
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#portfolio" style={{
              background: "#c4a882", color: "#2c2218", padding: "14px 36px",
              textDecoration: "none", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
              fontWeight: 400, transition: "all 0.3s",
            }}>View Portfolio</a>
            <a href="#contact" style={{
              border: "1px solid rgba(196,168,130,0.5)", color: "#c4a882", padding: "14px 36px",
              textDecoration: "none", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
              fontWeight: 400, transition: "all 0.3s",
            }}>Book a Session</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(196,168,130,0.6)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, rgba(196,168,130,0.6), transparent)" }} />
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#2c2218", padding: "40px 60px", display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap" }}>
        {[["250+", "Weddings"], ["12", "Years Experience"], ["4800+", "Happy Clients"], ["18", "Awards Won"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: "#c4a882", margin: "0 0 4px" }}>{num}</p>
            <p style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(250,246,240,0.45)", textTransform: "uppercase" }}>{label}</p>
          </div>
        ))}
      </section>

      {/* Portfolio */}
      <section id="portfolio" style={{ padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "16px" }}>My Work</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#2c2218", marginBottom: "40px" }}>
            Stories told in light
          </h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {["all", "wedding", "portrait"].map(f => (
              <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ columns: "3 280px", gap: "16px", maxWidth: "1200px", margin: "0 auto" }}>
          {filtered.map((photo, i) => (
            <div key={photo.id} className="photo-card" style={{ breakInside: "avoid", marginBottom: "16px", animationDelay: `${i * 0.1}s` }}>
              <PhotoCard photo={photo} onClick={setSelected} />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ background: "#2c2218", padding: "100px 60px", display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{
          width: "340px", height: "440px", flexShrink: 0,
          background: "linear-gradient(135deg, #c4a882 0%, #a08060 100%)",
          position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.15), transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "200px", height: "200px", border: "1px solid rgba(196,168,130,0.3)" }} />
          <div style={{ position: "absolute", top: "40px", left: "40px", right: "40px", bottom: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "72px", fontWeight: 300, color: "rgba(255,255,255,0.3)", lineHeight: 1 }}>AS</p>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "16px" }}>About Me</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#faf6f0", marginBottom: "24px", lineHeight: 1.2 }}>
            A storyteller<br /><em style={{ color: "#c4a882" }}>with a lens</em>
          </h2>
          <p style={{ color: "rgba(250,246,240,0.65)", lineHeight: 1.9, marginBottom: "16px", fontWeight: 300, fontSize: "15px" }}>
            Based in Mumbai, I travel across India to document love stories in their most authentic form. With over 12 years behind the lens, I believe the best photographs aren't posed — they're felt.
          </p>
          <p style={{ color: "rgba(250,246,240,0.65)", lineHeight: 1.9, marginBottom: "40px", fontWeight: 300, fontSize: "15px" }}>
            Every wedding is a universe of emotions. My job is to be invisible enough to let those emotions breathe, and present enough to never miss them.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {["Mumbai", "Delhi", "Jaipur", "Goa"].map(city => (
              <div key={city}>
                <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#c4a882", textTransform: "uppercase", marginBottom: "4px" }}>Available in</p>
                <p style={{ color: "#faf6f0", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "100px 60px", background: "#f5ede2" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "16px" }}>Kind Words</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#2c2218" }}>What couples say</h2>
        </div>
        <div style={{ display: "flex", gap: "32px", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap" }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ flex: 1, minWidth: "260px", background: "#fff", padding: "40px 32px", borderTop: "3px solid #c4a882" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#2c2218", lineHeight: 1.7, marginBottom: "28px", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div>
                <p style={{ fontWeight: 400, color: "#2c2218", fontSize: "14px", letterSpacing: "1px" }}>{t.name}</p>
                <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#c4a882", textTransform: "uppercase", marginTop: "4px" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" style={{ padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "16px" }}>Investment</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#2c2218" }}>Photography Packages</h2>
        </div>
        <div style={{ display: "flex", gap: "0", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap" }}>
          {packages.map((pkg, i) => (
            <div key={i} className={`pkg-card ${pkg.featured ? "pkg-featured" : ""}`} style={{ textAlign: "center" }}>
              {pkg.featured && <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(250,246,240,0.6)", marginBottom: "8px" }}>Most Popular</p>}
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, marginBottom: "8px", color: pkg.featured ? "#faf6f0" : "#2c2218" }}>{pkg.name}</h3>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: pkg.featured ? "rgba(250,246,240,0.6)" : "#c4a882", marginBottom: "24px" }}>{pkg.desc}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: pkg.featured ? "#faf6f0" : "#2c2218", marginBottom: "32px" }}>{pkg.price}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                {pkg.features.map(f => (
                  <p key={f} style={{ fontSize: "13px", color: pkg.featured ? "rgba(250,246,240,0.75)" : "#6b4f35", letterSpacing: "0.5px" }}>{f}</p>
                ))}
              </div>
              <a href="#contact" style={{
                display: "block", padding: "12px 0", textDecoration: "none",
                border: `1px solid ${pkg.featured ? "rgba(250,246,240,0.4)" : "#c4a882"}`,
                color: pkg.featured ? "#faf6f0" : "#6b4f35",
                fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
                transition: "all 0.3s",
              }}>Book Now</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: "#2c2218", padding: "100px 60px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c4a882", textTransform: "uppercase", marginBottom: "16px" }}>Get in Touch</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#faf6f0", marginBottom: "16px", lineHeight: 1.1 }}>
            Let's tell your<br /><em style={{ color: "#c4a882" }}>love story</em>
          </h2>
          <p style={{ color: "rgba(250,246,240,0.5)", marginBottom: "60px", fontWeight: 300, fontSize: "15px", lineHeight: 1.8 }}>
            Currently booking for 2025–2026 weddings. Reach out to check availability for your date.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            <input type="text" placeholder="Your Name" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(196,168,130,0.2)", padding: "16px 20px", color: "#faf6f0", fontSize: "14px", outline: "none", fontFamily: "'Lato', sans-serif", width: "100%" }} />
            <input type="email" placeholder="Email Address" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(196,168,130,0.2)", padding: "16px 20px", color: "#faf6f0", fontSize: "14px", outline: "none", fontFamily: "'Lato', sans-serif", width: "100%" }} />
            <input type="text" placeholder="Wedding Date" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(196,168,130,0.2)", padding: "16px 20px", color: "#faf6f0", fontSize: "14px", outline: "none", fontFamily: "'Lato', sans-serif", width: "100%" }} />
            <textarea placeholder="Tell me about your story..." rows={4} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(196,168,130,0.2)", padding: "16px 20px", color: "#faf6f0", fontSize: "14px", outline: "none", fontFamily: "'Lato', sans-serif", resize: "none", width: "100%" }} />
          </div>
          <button style={{ background: "#c4a882", color: "#2c2218", padding: "16px 60px", border: "none", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", width: "100%", fontFamily: "'Lato', sans-serif", transition: "all 0.3s" }}>
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1410", padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#faf6f0", letterSpacing: "2px" }}>
          Ananya <em style={{ color: "#c4a882" }}>Sharma</em>
        </p>
        <p style={{ fontSize: "12px", color: "rgba(250,246,240,0.3)", letterSpacing: "1px" }}>© 2026 · All rights reserved</p>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Instagram", "Pinterest", "WhatsApp"].map(s => (
            <a key={s} href="#" className="social-link">{s}</a>
          ))}
        </div>
      </footer>

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: "fixed", inset: 0, background: "rgba(20,14,8,0.95)", zIndex: 999,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "min(500px, 80vw)", height: "360px", background: selected.color, borderRadius: "4px", marginBottom: "24px", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), transparent 60%)` }} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: "#faf6f0", marginBottom: "8px" }}>{selected.title}</h3>
            <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#c4a882", textTransform: "uppercase" }}>{selected.location}</p>
            <p style={{ fontSize: "12px", color: "rgba(250,246,240,0.4)", marginTop: "24px", letterSpacing: "2px" }}>ESC or click to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
