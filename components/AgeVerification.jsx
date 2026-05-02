"use client";
import React, { useState, useEffect } from "react";

const AgeVerification = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      setShowPopup(true);
    }
  }, []);

  const handleVerify = (verified) => {
    if (verified) {
      localStorage.setItem("age-verified", "true");
      setShowPopup(false);
    } else {
      setIsBlocked(true);
    }
  };

  if (!showPopup && !isBlocked) return null;

  return (
    <div className="age-overlay">
      <div className="age-modal">
        {isBlocked ? (
          <div className="age-content">
            <i className="fa-solid fa-circle-exclamation age-icon error"></i>
            <h2 className="age-title">Access Denied</h2>
            <p className="age-text">
              You must be at least 21 years old to browse this website.
            </p>
            <button className="age-btn retry" onClick={() => setIsBlocked(false)}>
              Back
            </button>
          </div>
        ) : (
          <div className="age-content">
            <i className="fa-solid fa-user-shield age-icon"></i>
            <h2 className="age-title">Age Verification</h2>
            <p className="age-text">
              Are you 21 years of age or older?
            </p>
            <div className="age-btns">
              <button className="age-btn yes" onClick={() => handleVerify(true)}>
                Yes, I am 21+
              </button>
              <button className="age-btn no" onClick={() => handleVerify(false)}>
                No
              </button>
            </div>
            <p className="age-disclaimer">
              By clicking Yes, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
