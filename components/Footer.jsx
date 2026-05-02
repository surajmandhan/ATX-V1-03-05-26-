"use client";
import React from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import logoImg from "../assets/logos/newlog.png";

const Footer = () => {
  const { router } = useAppContext();

  return (
    <footer className="home-footer" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.07)" }}>
      <div className="footer-inner">
        <div className="footer-logo-wrap">
          <Link href="/" className="footer-logo-text">
            <img src={logoImg?.src || logoImg} alt="ATX Peptides Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
          </Link>
          <span className="footer-dev-label">Research Grade</span>
        </div>

        <div className="footer-links">
          <Link href="/all-products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="#">© {new Date().getFullYear()}</Link>

        </div>

        <div className="footer-contact">
          <a href="mailto:support@atxresearchpeptides.com" className="footer-contact-btn btn-email">
            <i className="fa-regular fa-envelope"></i> support@atxresearchpeptides.com
          </a>
          <a href="tel:1-800-555-0123" className="footer-contact-btn btn-phone">
            <i className="fa-solid fa-phone"></i> 1-800-555-0123
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Austin, Texas, USA • For Research Use Only • Not for Human Consumption</p>
      </div>
    </footer>
  );
};

export default Footer;
