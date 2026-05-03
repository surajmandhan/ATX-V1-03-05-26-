"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: "#0b0b0f", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: "120px", paddingBottom: "80px" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .policy-wrap { max-width: 900px; margin: 0 auto; padding: 0 20px; font-family: "Space Mono", monospace; }
          .policy-title { font-family: "Bebas Neue", sans-serif; font-size: 4rem; color: #e6e6eb; margin-bottom: 10px; letter-spacing: 2px; }
          .policy-date { font-size: 0.7rem; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
          .policy-section { margin-bottom: 40px; }
          .policy-section h3 { font-family: "Bebas Neue", sans-serif; font-size: 1.8rem; color: #ff0060; margin-bottom: 10px; letter-spacing: 1px; }
          .policy-section p, .policy-section li { font-size: 0.75rem; color: rgba(255,255,255,0.6); line-height: 1.8; }
          .policy-section ul { padding-left: 18px; margin-top: 5px; list-style-type: disc; }
          .policy-email { color: #eab308; text-decoration: none; transition: color 0.3s; }
          .policy-email:hover { color: #ffffff; }
          .back-btn { color: #22d3ee; font-size: 14px; text-decoration: none; margin-bottom: 20px; display: inline-block; transition: color 0.3s; font-family: "Space Mono", monospace; }
          .back-btn:hover { color: #ff0060; }
        `}} />

        <section className="policy-wrap">
          <Link href="/" className="back-btn">&larr; Back to Home</Link>
          
          <div className="policy-title">Privacy Policy</div>
          <div className="policy-date">Effective Date: February 19, 2026</div>

          <div className="policy-section">
            <h3>1. Overview</h3>
            <p>ATX Research Peptides (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) values your privacy and is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you interact with our website or services.</p>
          </div>

          <div className="policy-section">
            <h3>2. Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>Personal details such as name, email address, phone number, and shipping/billing information</li>
              <li>Account-related information if you register on our platform</li>
              <li>Customer support messages or inquiries you send to us</li>
              <li>Technical data such as IP address, browser type, device, and usage behavior</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>3. How We Use Your Information</h3>
            <ul>
              <li>To process and deliver your orders securely</li>
              <li>To communicate updates regarding orders or support requests</li>
              <li>To improve website performance and user experience</li>
              <li>To prevent fraudulent activity and maintain security</li>
              <li>To send optional marketing communications (only if you opt in)</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>4. Sharing of Information</h3>
            <p>We do not sell your personal data. However, we may share information with trusted partners such as:</p>
            <ul>
              <li>Payment processors and shipping providers</li>
              <li>Technology and hosting services</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>5. Data Protection</h3>
            <p>We implement appropriate security measures to protect your information. While we take strong precautions, no system is completely secure, and we cannot guarantee absolute protection.</p>
          </div>

          <div className="policy-section">
            <h3>6. Cookies & Tracking</h3>
            <p>Our website uses cookies and similar technologies to enhance functionality and analyze performance. You can manage cookie preferences through your browser settings.</p>
          </div>

          <div className="policy-section">
            <h3>7. External Links</h3>
            <p>Our website may contain links to third-party platforms. We are not responsible for their privacy practices and encourage users to review their policies separately.</p>
          </div>

          <div className="policy-section">
            <h3>8. Your Rights</h3>
            <ul>
              <li>Access or review your personal data</li>
              <li>Request corrections or deletion</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p>To make a request, contact us at <a href="mailto:Support@atxresearchpeptides.com" className="policy-email">Support@atxresearchpeptides.com</a></p>
          </div>

          <div className="policy-section">
            <h3>9. Age Restrictions</h3>
            <p>Our services are intended for individuals aged 18 and above. We do not knowingly collect data from minors.</p>
          </div>

          <div className="policy-section">
            <h3>10. SMS & Communication</h3>
            <p>If you opt in, you may receive messages related to order updates, product availability, or occasional promotions. You may opt out at any time by following unsubscribe instructions.</p>
          </div>

          <div className="policy-section">
            <h3>11. Policy Updates</h3>
            <p>We may update this policy from time to time. Continued use of our website means you accept any revised terms.</p>
          </div>

          <div className="policy-section">
            <h3>12. Contact Information</h3>
            <p>ATX Research Peptides<br/>India • Serving Worldwide<br/>Email: <a href="mailto:Support@atxresearchpeptides.com" className="policy-email">Support@atxresearchpeptides.com</a></p>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}