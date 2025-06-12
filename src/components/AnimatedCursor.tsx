"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Use refs for performance optimization
  const cursorRafRef = useRef<number | null>(null);
  const lastRunRef = useRef<number>(0);

  // Handle cursor movement with optimized RAF - simplified version
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRafRef.current !== null) {
        cancelAnimationFrame(cursorRafRef.current);
      }
      
      cursorRafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Simplified pointer detection
    const handleMouseOver = () => {
      // Skip execution if called too frequently
      const now = Date.now();
      if (now - lastRunRef.current < 50) return;
      lastRunRef.current = now;
      
      try {
        // Check if current element under cursor is interactive
        const hoveredElements = document.querySelectorAll(":hover");
        const isHoveringClickable = Array.from(hoveredElements).some(el => {
          const tagName = (el as Element).tagName.toLowerCase();
          return tagName === 'a' || tagName === 'button' || 
                 (window.getComputedStyle(el).cursor === 'pointer');
        });
        
        setIsPointer(isHoveringClickable);
      } catch (err) {
        console.error("Error in hover detection:", err);
      }
    };
    
    // Add only necessary event listeners with passive flag for performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    
    // Cleanup function
    return () => {
      if (cursorRafRef.current !== null) {
        cancelAnimationFrame(cursorRafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);
  
  // Don't render if cursor is not visible
  if (!isVisible) return null;

  return (
    <>
      {/* Blue ring that follows the cursor like in the image */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: "transparent",
          border: "2px solid #2563eb", // Bright blue border color
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          width: "40px",
          height: "40px",
        }}
        animate={{
          x: position.x - 20, // Center the circle around cursor
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "tween", // Use tween for direct following without spring physics
          duration: 0.1,  // Very short duration for responsive feel
          ease: "linear"  // Linear easing for constant speed
        }}
      />
      
      {/* Keep the normal cursor visible */}
      <style jsx global>{`
        /* Keep default cursor styles */
        html, body {
          cursor: default !important;
        }
        
        /* Preserve normal cursor interaction on elements */
        a, button, [role="button"], input[type="submit"], .cursor-pointer {
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
};

export default AnimatedCursor;