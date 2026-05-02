"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import "./home.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import toast from "react-hot-toast";
import fullLogoImg from "../assets/logos/newlogofull image.png";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import labAnimation from "../assets/logos/Chemistry Lab.json";

export default function HomePage() {
  const { router, products, addToCart } = useAppContext();

  const [activePill, setActivePill] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const trackRef = useRef(null);
  const dotsWrapRef = useRef(null);

  // Constants
  const displayProducts = products ? products.slice(0, 8) : [];
  const total = displayProducts.length;

  // Custom Slider State Ref
  const sliderState = useRef({
    current: 0,
    isDragging: false,
    dragStartX: 0,
    dragCurrentX: 0,
    baseOffset: 0,
  });

  // Init Slider
  useEffect(() => {
    // Slider Logic Cleanup on mount
    return () => {
    };
  }, []);

  const cardWidth = () => {
    if (!trackRef.current) return 0;
    const cards = trackRef.current.querySelectorAll(".atx-products-card");
    if (!cards || cards.length === 0) return 0;
    return cards[0].getBoundingClientRect().width + 24;
  };

  const applyTranslate = (px, animate) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = animate
      ? "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)"
      : "none";
    trackRef.current.style.transform = `translateX(${px}px)`;
  };

  const goTo = (index) => {
    const safeIndex = Math.max(0, Math.min(total - 1, index));
    sliderState.current.current = safeIndex;
    sliderState.current.baseOffset = -(safeIndex * cardWidth());
    applyTranslate(sliderState.current.baseOffset, true);

    if (dotsWrapRef.current) {
      dotsWrapRef.current.querySelectorAll(".slider-dot").forEach((d, i) => {
        d.classList.toggle("active", i === safeIndex);
      });
    }
  };

  const onDragStart = (e) => {
    sliderState.current.isDragging = true;
    sliderState.current.dragStartX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    sliderState.current.dragCurrentX = sliderState.current.dragStartX;
    if (trackRef.current) trackRef.current.classList.add("dragging");
    if (e.type === "mousedown") e.preventDefault();
  };

  const onDragMove = (e) => {
    if (!sliderState.current.isDragging) return;
    sliderState.current.dragCurrentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const diff = sliderState.current.dragCurrentX - sliderState.current.dragStartX;
    applyTranslate(sliderState.current.baseOffset + diff, false);
  };

  const onDragEnd = () => {
    if (!sliderState.current.isDragging) return;
    sliderState.current.isDragging = false;
    if (trackRef.current) trackRef.current.classList.remove("dragging");

    const diff = sliderState.current.dragCurrentX - sliderState.current.dragStartX;
    if (diff < -60) goTo(sliderState.current.current + 1);
    else if (diff > 60) goTo(sliderState.current.current - 1);
    else goTo(sliderState.current.current);
  };

  useEffect(() => {
    const onWindowMouseMove = (e) => onDragMove(e);
    const onWindowMouseUp = () => onDragEnd();
    const handleResize = () => goTo(sliderState.current.current);

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [total]);

  const handleTrackClick = (e) => {
    if (Math.abs(sliderState.current.dragCurrentX - sliderState.current.dragStartX) > 5) {
      e.preventDefault();
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    target.style.transform = "scale(1.2)";
    setTimeout(() => {
      if (target) target.style.transform = "scale(1)";
    }, 200);

    const itemId = product.size ? `${product._id}---${product.size}` : product._id;
    addToCart(itemId);
    setAddedItems((prev) => ({ ...prev, [product._id]: true }));
  };

  const renderCardClass = (index) => {
    const classes = ["card-metabolic", "card-longevity", "card-weight", "card-growth"];
    return classes[index % classes.length];
  };

  const renderCardIcon = (index) => {
    const icons = ["fa-vial", "fa-flask", "fa-dna", "fa-atom"];
    return icons[index % icons.length];
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast("We need your email… we can’t read minds (yet 😄).", { icon: "🤔" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Hmm… that doesn’t look like a real email.");
      return;
    }

    setIsSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        toast("You're already on the VIP list.", { icon: "😎" });
      } else if (res.ok) {
        toast.success("Nice choice! You're officially subscribed.");
        setEmail("");
      } else {
        toast.error("Oops! Something went wrong. Try again later.");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      
      <div className="home-wrapper">

        <Navbar />

        {/* HERO */}
        <section className="home-hero mt-[150px]" id="home">
          {/* Background Video */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0">
            <source src="https://publer-media-downloader.kalemi-code4806.workers.dev/?url=https%3A%2F%2Fredirector.googlevideo.com%2Fvideoplayback%3Fexpire%3D1775895562%26ei%3Dqq_ZaZPmA4qy8uMP9-fkyQ8%26ip%3D80.187.121.198%26id%3Do-ANkJoinIscW_vtcwsbASzRFcP5UahDXwMUiLbPclrkHw%26itag%3D18%26source%3Dyoutube%26requiressl%3Dyes%26xpc%3DEgVo2aDSNQ%253D%253D%26cps%3D243%26met%3D1775873962%252C%26mh%3DUv%26mm%3D31%252C29%26mn%3Dsn-bvvbaxivnuxqqu5b-4g5l%252Csn-4g5lznlz%26ms%3Dau%252Crdu%26mv%3Dm%26mvi%3D5%26pl%3D26%26rms%3Dau%252Cau%26initcwndbps%3D2163750%26bui%3DAUUZDGKywHjrYtYhAQToTJAiqR3MGlamQ84_Rlmt1SzlZMWzzzdIhMsJdrA2tZ-sKK6xcEqN2aKPAmY7%26spc%3DjlWavXzLybGCP_bV9nEfWH1moiOCazmQUft_N4NpjnzU32fqUbLp%26vprv%3D1%26svpuc%3D1%26mime%3Dvideo%252Fmp4%26rqh%3D1%26cnr%3D14%26ratebypass%3Dyes%26dur%3D27.120%26lmt%3D1730008830803160%26mt%3D1775873615%26fvip%3D4%26fexp%3D51565116%252C51565681%26c%3DANDROID_VR%26txp%3D5430434%26sparams%3Dexpire%252Cei%252Cip%252Cid%252Citag%252Csource%252Crequiressl%252Cxpc%252Cbui%252Cspc%252Cvprv%252Csvpuc%252Cmime%252Crqh%252Ccnr%252Cratebypass%252Cdur%252Clmt%26sig%3DAHEqNM4wRQIhANRVEjLYsG5XHTOCbz2tJDo0I26HKbSCZfY6XCm1F_BTAiBIVnVbTKcEYFyZGxy5yQtDit7HqG4rJxE7W-xkoP9n4w%253D%253D%26lsparams%3Dcps%252Cmet%252Cmh%252Cmm%252Cmn%252Cms%252Cmv%252Cmvi%252Cpl%252Crms%252Cinitcwndbps%26lsig%3DAPaTxxMwRQIhAJ-9ZiegTVNk7T-v6CpqbipgOon8pB7zqezaaQZavgeLAiBMC1Uij33lmW19tHIPT7JOKRoZ64gSInMCXjPaKjlaVw%253D%253D%26pot%3DMt4EOQOKE48mTMI5PQLKY3l1NwAoXDjKLyf16l5td04Hn7-2Hw9aUS-XuuBc9sqLCiqKxSg7iCbrC9PgX-zN7aJvrMSGsVeo6pVtiiXyoKqxQTSSFLQZokiPEK97kxdCCmrHwzWxE-hPDyMc-lVhYilNQr7CMlTKAGyRmGeWaskbagwy99B7WfhS_WRGVveIwMkCpZr4MS5hskQvXsHp_0TA7jDYA0tHuzfkYKTRw1qlOXZvNhCYv23xmBilcoeCjvLrxZJWbBLtNA-l2rhhnKOsu3I9y68sP0djeQ-gHjENl2HFDdiXNknsV3euZp8fJ8nm3FmSg6A5VLyS76DhhjSeyBoIfK5AdCMAjh16GA955tJe71ee_i3ZcK7GnxGvVrqQbiwYDA_XNRvOeJ6aM1W7VOaO_6XzZ3C7QxGkNPsYNy_mQCL85YSiX-BginvO6xy7R3akGXlRU9Jg-0tSBFfRpGNeTzt9Hqhhv0WELYQOS_8bGXAwPUJHX2Iy6XYLOK3gp3piZF6d_9p3Hkzkf7uyoXWw9uQGPzmjOVG4KC3EvIEOJLHkl-ur0Se4Bv0B_YKl8lIyzwDeUI4JBM0WXfnCqmr6-JetP4XGDxSQNeyRtRGMdXAG9OsQ0EgCys3y2XzsypE94B3n8R02ywTZX5QZGnX6hDkj_70-Dq0tcNjBSry-g-5ajLAiQ61v3MglK0FAmx9OT_ReLbopdW_NpLsCXsabHgQ0fvDlc8j9vS4jfXFhKnZccAHjim20K5yjX_eLS4M9USSostvb5HoDWdNT90FRAgBA0N0ZAQNG10SI&noDownload=false" type="video/mp4" />
          </video>

          <div className="home-hero-blob"></div>
          <div className="home-hero-blob2"></div>

          <div className="home-hero-text">
            <div className="home-hero-eyebrow">
              <div className="dot"></div>
              <span>Austin, Texas Based • U.S. Sourced • Lab Tested</span>
            </div>

            <h2 className="home-hero-h2">
              <span className="pink">PREMIUM</span><br/>
              <span>RESEARCH</span><br/>
              <span className="yellow">PEPTIDES</span>
            </h2>

            <p className="home-hero-sub">
              High-quality U.S.-sourced research peptides independently tested by accredited laboratories for identity and purity.
            </p>

            <div className="home-hero-pills">
              {['Metabolic', 'Growth', 'Recovery', 'Cognitive', 'Longevity'].map((pill, i) => (
                <div 
                  key={i} 
                  className={`home-hero-pill ${activePill === i ? 'active' : ''}`}
                  onClick={() => setActivePill(i)}
                >
                  {pill}
                </div>
              ))}
            </div>

            <div className="home-hero-btns">
              <Link href="/all-products" className="btn-home-hero-primary">Browse Products ↓</Link>
              <Link href="/about" className="btn-home-hero-secondary">View Details</Link>
            </div>

            <div className="home-hero-mini-stats">
              <div className="hms-chip">
                <div>
                  <div className="hms-val">99%+</div>
                  <div className="hms-lbl">Purity</div>
                </div>
              </div>
              <div className="hms-chip">
                <div>
                  <div className="hms-val">100%</div>
                  <div className="hms-lbl">U.S. Sourced</div>
                </div>
              </div>
              <div className="hms-chip">
                <div>
                  <div className="hms-val">3rd</div>
                  <div className="hms-lbl">Lab Tested</div>
                </div>
              </div>
            </div>
          </div>

          {/* LOTTIE ANIMATION ON THE RIGHT */}
          <div className="hidden lg:flex justify-center items-center relative z-10 p-10">
            <Lottie 
                animationData={labAnimation} 
                loop={true} 
                autoplay={true}
                className="w-full max-w-[550px] drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            />
          </div>
        </section>

        {/* STATS */}
        <div className="stats-strip">
          <div className="stat">
            <div className="stat-num">99%+</div>
            <div className="stat-label">Purity Standards</div>
          </div>
          <div className="stat">
            <div className="stat-num">100%</div>
            <div className="stat-label">U.S. Sourced</div>
          </div>
          <div className="stat">
            <div className="stat-num">3rd</div>
            <div className="stat-label">Lab Tested</div>
          </div>
          <div className="stat">
            <div className="stat-num">50+</div>
            <div className="stat-label">Products</div>
          </div>
        </div>

        {/* LIFESTYLE / ABOUT */}
        <section className="lifestyle" id="about">
          <div className="lifestyle-inner">
            <div className="lifestyle-img-wrap">
              <div className="lifestyle-img-frame">
                <img src={fullLogoImg?.src || fullLogoImg} alt="ATX Peptides Logo Full" style={{ objectFit: "contain", width: "100%", height: "auto" }} />
              </div>
              <div className="ls-badge">Lab Certified ✓</div>
            </div>

            <div className="lifestyle-content">
              <div className="ls-kicker">about atx peptides</div>
              <h3 className="ls-title">QUALITY.<br/>TESTED.<br/>TRUSTED.</h3>

              <p className="ls-copy">
                Based in Austin, Texas, ATX Research Peptides is committed to providing high-quality research peptides sourced within the United States. All products are independently tested by certified third-party laboratories to ensure purity, identity, and consistency.
              </p>

              <ul className="ls-features">
                <li>
                  <div className="ls-dot"></div><strong>U.S. Sourced</strong> — trusted suppliers only
                </li>
                <li>
                  <div className="ls-dot"></div><strong>Lab Verified</strong> — tested for identity & purity
                </li>
                <li>
                  <div className="ls-dot"></div><strong>Reliable</strong> — built for research professionals
                </li>
              </ul>

              <div className="ls-warning-box">
                <i className="fa-solid fa-exclamation-triangle"></i>
                <span>For Research Use Only. Not for human consumption.</span>
              </div>

              <div className="ls-btns">
                <Link href="/all-products" className="ls-btn-p">View Products</Link>
                <Link href="/about" className="ls-btn-s">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT SLIDER */}
        <section className="slider-section" id="products">
          <div className="section-header">
            <h3>OUR<br/><em>CATALOG</em></h3>
            <p>Explore our range of high-purity research peptides and compounds for scientific research.</p>
          </div>

          <div className="slider-viewport" id="sliderViewport">
            <div 
              className="slider-track" 
              id="sliderTrack" 
              ref={trackRef}
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              onTouchMove={onDragMove}
              onTouchEnd={onDragEnd}
              onClick={handleTrackClick}
            >
              {displayProducts.map((product, i) => (
                <a 
                  key={product._id} 
                  className={`atx-products-card ${renderCardClass(i)}`}
                  onClick={(e) => {
                    if(Math.abs(sliderState.current.dragCurrentX - sliderState.current.dragStartX) > 5) {
                      e.preventDefault();
                      return;
                    }
                    router.push("/product/" + product.handle);
                  }}
                >
                  <span className="card-chip" style={{ color: 'rgb(0, 0, 0)' }}>Compound</span>
                  <div className="card-img-placeholder">
                    {product.image && product.image.length > 0 ? (
                      <img 
                        src={product.image[0]} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <i className={`fa-solid ${renderCardIcon(i)}`}></i>
                    )}
                  </div>
                  <div className="card-bottom">
                    <div 
                      className="card-name line-clamp-2 overflow-hidden text-ellipsis"
                      style={{ lineHeight: "1.1", marginBottom: "8px" }}
                      title={product.name}
                    >
                      {product.name}
                    </div>
                    
                    {product.description && (
                      <div className="card-desc line-clamp-2">
                        {product.description}
                      </div>
                    )}

                    <div className="card-footer">
                      <div className="card-price">{product.displayPrice} {product.size ? `/ ${product.size}` : ''}</div>
                        <button className="card-btn" onClick={(e) => handleAddToCart(e, product)}>
                          {addedItems[product._id] ? "Added ✓" : "Add"}
                        </button>
                    </div>
                  </div>
                </a>
              ))}
              
              {/* Fallback if no products */ }
              {displayProducts.length === 0 && (
                 <div style={{color: 'rgba(255,255,255,0.5)', padding: '40px'}}>Loading catalog...</div>
              )}
            </div>
          </div>

          <div className="slider-controls">
            <button className="ctrl-btn" id="prevBtn" onClick={() => goTo(sliderState.current.current - 1)}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="ctrl-btn" id="nextBtn" onClick={() => goTo(sliderState.current.current + 1)}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="slider-dots" id="sliderDots" ref={dotsWrapRef}>
              {displayProducts.map((_, i) => (
                <div 
                  key={i} 
                  className={`slider-dot ${i === 0 ? 'active' : ''}`} 
                  onClick={() => goTo(i)}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* SHIPPING */}
        <section className="shipping-section">
          <div className="section-header" style={{textAlign:"center", maxWidth:"800px", margin:"0 auto 50px"}}>
            <h3>SHIPPING<br/><em>& DELIVERY</em></h3>
            <p>Fast, discreet, and reliable delivery for all orders.</p>
          </div>

          <div className="shipping-grid">
            <div className="ship-card">
              <div className="ship-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <div className="ship-name">Discreet Packaging</div>
              <div className="ship-desc">Your orders packaged with privacy</div>
            </div>

            <div className="ship-card">
              <div className="ship-icon">
                <i className="fa-solid fa-shipping-fast"></i>
              </div>
              <div className="ship-name">Fast Dispatch</div>
              <div className="ship-desc">Ships within 24-48 hours</div>
            </div>

            <div className="ship-card">
              <div className="ship-icon">
                <i className="fa-solid fa-map-marker-alt"></i>
              </div>
              <div className="ship-name">Order Tracking</div>
              <div className="ship-desc">Track your package every step</div>
            </div>

            <div className="ship-card">
              <div className="ship-icon">
                <i className="fa-solid fa-flag-usa"></i>
              </div>
              <div className="ship-name">U.S. Shipping Only</div>
              <div className="ship-desc">Currently USA only</div>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="ingredients-section" id="disclaimer">
          <div className="section-header" style={{maxWidth:"1000px", margin:"0 auto", textAlign:"center"}}>
            <h3>IMPORTANT<br/><em>DISCLAIMER</em></h3>
            <p>Strictly for research use only. Please read carefully.</p>
          </div>

          <div className="ingredients-grid">
            <div className="ing-card">
              <div className="ing-name">Research Use Only</div>
              <div className="ing-desc">Products are intended for laboratory research purposes only.</div>
            </div>

            <div className="ing-card">
              <div className="ing-name">Not FDA Approved</div>
              <div className="ing-desc">These compounds have not been evaluated by the FDA.</div>
            </div>

            <div className="ing-card">
              <div className="ing-name">No Human Use</div>
              <div className="ing-desc">Not intended for human or animal consumption.</div>
            </div>

            <div className="ing-card">
              <div className="ing-name">Qualified Use Only</div>
              <div className="ing-desc">Must be handled by certified professionals only.</div>
            </div>

            <div className="ing-card">
              <div className="ing-name">No Liability</div>
              <div className="ing-desc">Company assumes no responsibility for misuse.</div>
            </div>

            <div className="ing-card" style={{display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
              <div style={{color:"var(--hot-pink)", fontSize:"1rem", fontWeight:700}}>
                <i className="fa-solid fa-exclamation-triangle" style={{display:"block", fontSize:"2rem", marginBottom:"10px"}}></i>
                KEEP OUT OF REACH OF CHILDREN
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter" id="contact">
          <div className="newsletter-inner">
            <div className="nl-left">
              <div className="nl-tag">Join Us</div>
              <h3>GET UPDATES<br/>ON NEW<br/>RESEARCH</h3>

              <div className="nl-proof-text">
                <strong>Join our community</strong><br/>
                Stay updated with latest products & lab reports
              </div>
            </div>

            <div className="nl-right">
              <form className="nl-form" onSubmit={handleSubscribe} noValidate>
                <input 
                  type="email" 
                  className="nl-input" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="nl-btn" disabled={isSubscribing}>
                  {isSubscribing ? "Wait..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}