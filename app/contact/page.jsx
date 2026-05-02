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
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: "What shipping options do you offer?",
      answer: "We offer standard and express shipping with secure packaging.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship internationally to selected regions.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cards, UPI, and bank transfers.",
    },
    {
      question: "How should I store products?",
      answer: "Store in a cool, dry place away from sunlight.",
    },
  ];

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      topic: formData.get("topic"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully! Our team will get back to you shortly.");
        e.target.reset();
      } else {
        const result = await response.json();
        toast.error(`Error: ${result.error || "Failed to send message."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
              support@atxresearchpeptides.com
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

      {/* FAQ */}
      <div className="faq">
        <h3>Frequently Asked Questions</h3>

        {faqs.map((faq, index) => (
          <div
            className="faq-item"
            key={index}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-head">
              <div className="faq-question">{faq.question}</div>
              <div className="faq-icon">{openFaq === index ? "-" : "+"}</div>
            </div>
            <div
              className="faq-answer"
              style={{ display: openFaq === index ? "block" : "none" }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}