"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./about.css";
import fullLogoImg from "../../assets/logos/newlogofull image.png";

export default function AboutPage() {
  const { router } = useAppContext();

  useEffect(() => {
    // Console logs exactly matching the provided JS
    console.log(
      "%c⚗️ ATX Research Peptides",
      "font-size: 20px; font-weight: bold; color: #ff2d78;"
    );
    console.log(
      "%cFor Research Use Only",
      "font-size: 14px; color: #ffe600;"
    );

    const loadTime = performance.now();
    console.log(
      `%cPage loaded in ${Math.round(loadTime)}ms`,
      "color: #b8ff00;"
    );

    return () => {
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
      />
      <link 
        rel="stylesheet" 
      />

      <Navbar />

      {/* HERO BANNER */ }
      <section className="about-hero mt-[110px]" style={{ minHeight: "60vh" }}>
        <div className="about-hero-text">
          <div className="about-hero-eyebrow">
            <div className="dot"></div>
            <span>ABOUT ATX RESEARCH PEPTIDES</span>
          </div>

          <h2 className="about-hero-h2" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
            <span className="pink">ABOUT </span>
            <span>ATX </span>
            <span className="yellow">RESEARCH PEPTIDES</span>
          </h2>

          <p className="about-hero-sub" style={{ textAlign: "center", maxWidth: "600px", margin: "16px auto 22px" }}>
            Built for researchers who demand precision, reliability, and
            transparency. ATX Research Peptides delivers high-purity compounds
            designed to support cutting-edge scientific exploration.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */ }
      <section className="lifestyle">
        <div className="lifestyle-inner">
          <div className="lifestyle-content">
            <div className="ls-kicker">who we are</div>
            <h3 className="ls-title">
              ENGINEERED FOR
              <br />
              MODERN
              <br />
              RESEARCH
            </h3>

            <p className="ls-copy">
              ATX Research Peptides is a U.S.-based supplier dedicated to
              delivering premium research-grade peptides to laboratories, academic
              institutions, and biotechnology innovators.
              <br />
              <br />
              Our mission is simple — to provide scientists with compounds they
              can trust. Every product is sourced with precision, handled under
              strict protocols, and verified through independent laboratory testing.
              <br />
              <br />
              As peptide research continues to expand into metabolic science,
              regenerative biology, and longevity studies, we position ourselves
              at the forefront by ensuring quality, consistency, and scientific
              integrity.
            </p>

            <ul className="ls-features">
              <li>
                <div className="ls-dot"></div>
                <strong>Precision Sourcing</strong> — trusted U.S. suppliers
              </li>
              <li>
                <div className="ls-dot"></div>
                <strong>Scientific Integrity</strong> — research-first approach
              </li>
              <li>
                <div className="ls-dot"></div>
                <strong>Reliable Supply</strong> — consistent batch quality
              </li>
            </ul>
          </div>

          <div className="lifestyle-img-wrap">
            <div className="lifestyle-img-frame">
              <img
                src={fullLogoImg?.src || fullLogoImg}
                alt="ATX Peptides Logo Full"
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
            <div className="ls-badge">Trusted Lab ✓</div>
          </div>
        </div>
      </section>

      {/* QUALITY SECTION */ }
      <section className="shipping-section">
        <div className="section-header" style={{ textAlign: "center" }}>
          <h3>
            QUALITY
            <br />
            <em>&amp; TESTING</em>
          </h3>
          <p>Strict protocols ensuring every compound meets research-grade standards.</p>
        </div>

        <div className="shipping-grid">
          <div className="ship-card">
            <div className="ship-icon">
              <i className="fa-solid fa-flask"></i>
            </div>
            <div className="ship-name">Third-Party Tested</div>
            <div className="ship-desc">Independent lab verification for every batch</div>
          </div>

          <div className="ship-card">
            <div className="ship-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div className="ship-name">98%+ Purity</div>
            <div className="ship-desc">Verified through HPLC &amp; mass spectrometry</div>
          </div>

          <div className="ship-card">
            <div className="ship-icon">
              <i className="fa-solid fa-file-alt"></i>
            </div>
            <div className="ship-name">COA Reports</div>
            <div className="ship-desc">Transparent documentation with each product</div>
          </div>

          <div className="ship-card">
            <div className="ship-icon">
              <i className="fa-solid fa-snowflake"></i>
            </div>
            <div className="ship-name">Cold Chain</div>
            <div className="ship-desc">Maintained stability during shipping</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */ }
      <section className="slider-section">
        <div className="section-header">
          <h3>
            RESEARCH
            <br />
            <em>CATEGORIES</em>
          </h3>
          <p>Our compounds support multiple scientific research domains.</p>
        </div>

        <div className="ingredients-grid">
          <div className="ing-card">
            <div className="ing-name">Metabolic</div>
            <div className="ing-desc">GLP-based peptides for metabolic research studies.</div>
          </div>

          <div className="ing-card">
            <div className="ing-name">Growth</div>
            <div className="ing-desc">Growth hormone peptides and secretagogues.</div>
          </div>

          <div className="ing-card">
            <div className="ing-name">Recovery</div>
            <div className="ing-desc">Tissue repair &amp; regenerative compounds.</div>
          </div>

          <div className="ing-card">
            <div className="ing-name">Cognitive</div>
            <div className="ing-desc">Nootropic and neural research compounds.</div>
          </div>

          <div className="ing-card">
            <div className="ing-name">Longevity</div>
            <div className="ing-desc">Cellular health &amp; mitochondrial research.</div>
          </div>

          <div className="ing-card">
            <div className="ing-name">Custom Stacks</div>
            <div className="ing-desc">Curated blends for advanced research protocols.</div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */ }
      <section className="lifestyle">
        <div className="lifestyle-inner">
          <div className="lifestyle-img-wrap">
            <div className="lifestyle-img-frame">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                alt="Compliance"
              />
            </div>
            <div className="ls-badge">Compliance ✓</div>
          </div>

          <div className="lifestyle-content">
            <div className="ls-kicker">compliance</div>
            <h3 className="ls-title">
              RESEARCH USE
              <br />
              ONLY
              <br />
              POLICY
            </h3>

            <p className="ls-copy">
              All products offered by ATX Research Peptides are strictly intended
              for laboratory research purposes only.
              <br />
              <br />
              Our compounds are not approved for human or veterinary use. By
              purchasing, customers confirm they are qualified professionals
              conducting legitimate scientific research.
              <br />
              <br />
              We operate under strict compliance with all applicable regulations
              governing research compounds, ensuring ethical and responsible
              distribution.
            </p>

            <div className="ls-warning-box">
              <i className="fa-solid fa-exclamation-triangle"></i>
              <span>Not for human consumption. For laboratory research only.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */ }
      <section className="newsletter">
        <div className="newsletter-inner">
          <div className="nl-left">
            <div className="nl-tag">Explore</div>
            <h3>
              READY TO
              <br />
              START YOUR
              <br />
              RESEARCH?
            </h3>

            <div className="nl-proof-text">
              Browse our catalog of high-purity peptides and verified compounds.
            </div>
          </div>

          <button
            className="nl-btn"
            onClick={() => router.push("/all-products")}
          >
            Browse Products ↗
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}