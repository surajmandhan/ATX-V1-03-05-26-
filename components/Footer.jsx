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
        </div>

        <div className="footer-links">
          <Link href="/">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="#">© {new Date().getFullYear()}</Link>

        </div>

        <div className="footer-contact">
          <a href="mailto:Support@atxresearchpeptides.com" className="footer-contact-btn btn-email">
            <i className="fa-regular fa-envelope"></i> Support@atxresearchpeptides.com
          </a>
          <a href="https://wa.me/15126347919" target="_blank" rel="noopener noreferrer" className="footer-contact-btn btn-phone">
            <i className="fa-brands fa-whatsapp"></i> +1 (512) 634-7919
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
