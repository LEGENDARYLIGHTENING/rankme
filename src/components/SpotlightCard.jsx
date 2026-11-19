"use client";

import { useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(201, 168, 76, 0.14)',
  radius = 500,
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`aceternity-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0c0e12',
        border: isHovered ? '1px solid rgba(201, 168, 76, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: isHovered ? '0 12px 30px -10px rgba(201, 168, 76, 0.15)' : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(${radius}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  );
}
