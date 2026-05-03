"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiniCart from "@/components/MiniCart";
import "./contact.css";

export default function ContactPage() {
  const { router, isMiniCartOpen, setIsMiniCartOpen, getCartCount, user } = useAppContext();
  // const { openSignIn } = useClerk(); // Removed Clerk
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);




  useEffect(() => {
    // Sticky Nav Logic
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // API logic removed to eliminate Supabase dependency.
    setTimeout(() => {
      toast.success("Thank you! We have received your message.");
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <>
      <link
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
      />

      <Navbar />

      {/* HERO */}
      <section className="hero mt-[110px]" style={{ minHeight: "50vh" }}>
        <div className="hero-text">
          <h2 className="hero-h2">
            <span className="pink">CONTACT </span>
            <span className="yellow">US</span>
          </h2>

          <p className="hero-sub" style={{ textAlign: "center", maxWidth: "600px", margin: "16px auto 22px" }}>
            Have a question or need assistance? Our team is here to support you
            every step of the way.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-wrap">
        {/* LEFT */}
        <div className="contact-box">
          <h3>Get in Touch</h3>

          <div className="contact-info-item">
            <i className="fa-solid fa-envelope"></i>
            <div style={{ color: "rgba(255, 248, 240, 0.6)" }}>
              <strong style={{ color: "var(--cream)" }}>Email</strong>
              <br />
              Support@atxresearchpeptides.com
            </div>
          </div>

          <div className="contact-info-item">
            <i className="fa-brands fa-whatsapp"></i>
            <div style={{ color: "rgba(255, 248, 240, 0.6)" }}>
              <strong style={{ color: "var(--cream)" }}>WhatsApp</strong>
              <br />
              <a href="https://wa.me/15126347919" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                +1 (512) 634-7919
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <i className="fa-solid fa-clock"></i>
            <div style={{ color: "rgba(255, 248, 240, 0.6)" }}>
              <strong style={{ color: "var(--cream)" }}>Response Time</strong>
              <br />
              24–48 Hours
            </div>
          </div>

          <div className="contact-info-item">
            <i className="fa-solid fa-location-dot"></i>
            <div style={{ color: "rgba(255, 248, 240, 0.6)" }}>
              <strong style={{ color: "var(--cream)" }}>Location</strong>
              <br />
              Austin, Texas • USA
            </div>
          </div>

          <p style={{ color: "rgba(255, 248, 240, 0.6)", marginTop: "20px" }}>
            Whether you have questions about products, shipping, or bulk orders
            — we’re always ready to help.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-box">
          <h3>Send Message</h3>

          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />

            <select name="topic" required>
              <option value="">Select Topic</option>
              <option value="Order Inquiry">Order Inquiry</option>
              <option value="Product Question">Product Question</option>
              <option value="Shipping Info">Shipping Info</option>
              <option value="Wholesale / Bulk Orders">Wholesale / Bulk Orders</option>
              <option value="Other">Other</option>
            </select>

            <textarea name="message" placeholder="How can we assist you?" required></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            <p style={{ fontSize: "0.6rem", opacity: 0.5, marginTop: "10px" }}>
              By submitting this form, you agree to our Privacy Policy &amp; Terms.
            </p>
          </form>
        </div>
      </div>



      <Footer />
    </>
  );
}