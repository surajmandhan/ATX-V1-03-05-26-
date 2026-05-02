"use client";
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let hasMouse = false;

    const onFirstMouseMove = () => {
      if (!hasMouse && cursor) {
        hasMouse = true;
        cursor.classList.add("visible");
        document.body.style.cursor = "none";
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
          if (cursor) {
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
          }
          isMoving = false;
        });
      }
    };

    // Dynamic Hover Detection (Event Delegation)
    const onMouseOver = (e) => {
      const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button'], .faq-item, .shake-card, .ing-card, .hero-pill, .ship-card, .filter-btn, .qty-btn, .remove, .cl-button, .cl-input, .cl-socialButtonsBlockButton");
      if (isInteractive) cursor?.classList.add("big");
      else cursor?.classList.remove("big");
    };

    window.addEventListener("mousemove", onFirstMouseMove, { once: false });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onFirstMouseMove);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return <div className="cursor" id="cursor" ref={cursorRef}></div>;
}