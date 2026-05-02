"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  /** Background gradient: [from, to]. Default: dark black/charcoal */
  bgColor?: [string, string];
  /** Text / icon color inside the button */
  textColor?: string;
  /** Fixed pixel width. Default: auto-sized to label */
  width?: number;
  /** Fixed pixel height. Default: 46 */
  height?: number;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  href,
  target,
  rel,
  icon,
  bgColor = ["#202020", "#000000"],
  textColor = "#666666",
  width: fixedWidth,
  height: fixedHeight = 46,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);
  const containerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  const w = fixedWidth ?? (label ? Math.max(label.length * 9 + (icon ? 40 : 24), 120) : 46);
  const h = fixedHeight;
  const innerW = w - 4;
  const innerH = h - 4;

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important; height: 100% !important;
          display: block !important; position: absolute !important;
          top: 0 !important; left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    if (shaderRef.current) {
      if (shaderMount.current?.destroy) shaderMount.current.destroy();
      try {
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          { u_repetition: 4, u_softness: 0.5, u_shiftRed: 0.3, u_shiftBlue: 0.3, u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8, u_shape: 1, u_offsetX: 0.1, u_offsetY: -0.1 },
          undefined,
          0.6,
        );
      } catch { /* shader init failed silently */ }
    }

    return () => { shaderMount.current?.destroy?.(); shaderMount.current = null; };
  }, []);

  const handleMouseEnter = () => { setIsHovered(true); shaderMount.current?.setSpeed?.(1); };
  const handleMouseLeave = () => { setIsHovered(false); setIsPressed(false); shaderMount.current?.setSpeed?.(0.6); };

  const handleClick = (e: React.MouseEvent) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6), 300);
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
    setRipples(prev => [...prev, ripple]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 600);
    onClick?.();
  };

  const pressTransform = isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)";
  const ease = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease";

  const inner = (
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      <div style={{ position: "relative", width: `${w}px`, height: `${h}px`, transformStyle: "preserve-3d", transition: ease, transform: "none" }}>

        {/* Label layer */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transformStyle: "preserve-3d", transition: ease, transform: "translateZ(20px)", zIndex: 30, pointerEvents: "none" }}>
          {icon && <span style={{ color: textColor, filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))", display: "flex", alignItems: "center" }}>{icon}</span>}
          {label && <span style={{ fontSize: "14px", color: textColor, fontWeight: 500, textShadow: "0px 1px 2px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>{label}</span>}
        </div>

        {/* Inner bg */}
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transition: ease, transform: `translateZ(10px) ${pressTransform}`, zIndex: 20 }}>
          <div style={{ width: `${innerW}px`, height: `${innerH}px`, margin: "2px", borderRadius: "100px", background: `linear-gradient(180deg, ${bgColor[0]} 0%, ${bgColor[1]} 100%)`, boxShadow: isPressed ? "inset 0px 2px 4px rgba(0,0,0,0.4)" : "none", transition: ease + ", box-shadow 0.15s ease" }} />
        </div>

        {/* Shader ring */}
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transition: ease, transform: `translateZ(0px) ${pressTransform}`, zIndex: 10 }}>
          <div style={{ height: `${h}px`, width: `${w}px`, borderRadius: "100px",
            boxShadow: isPressed
              ? "0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px rgba(0,0,0,0.3)"
              : isHovered
                ? "0px 0px 0px 1px rgba(0,0,0,0.4), 0px 12px 6px rgba(0,0,0,0.05), 0px 4px 4px rgba(0,0,0,0.15), 0px 1px 2px rgba(0,0,0,0.2)"
                : "0px 0px 0px 1px rgba(0,0,0,0.3), 0px 20px 12px rgba(0,0,0,0.08), 0px 9px 9px rgba(0,0,0,0.12), 0px 2px 5px rgba(0,0,0,0.15)",
            transition: ease + ", box-shadow 0.15s ease", background: "transparent",
          }}>
            <div ref={shaderRef} className="shader-container-exploded" style={{ borderRadius: "100px", overflow: "hidden", position: "relative", width: `${w}px`, height: `${h}px` }} />
          </div>
        </div>

        {/* Ripples */}
        <div style={{ position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none", overflow: "hidden", borderRadius: "100px" }}>
          {ripples.map(r => (
            <span key={r.id} style={{ position: "absolute", left: `${r.x}px`, top: `${r.y}px`, width: "20px", height: "20px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)", animation: "ripple-animation 0.6s ease-out" }} />
          ))}
        </div>
      </div>
    </div>
  );

  const sharedProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
    "aria-label": label || "button",
    style: { display: "inline-block", cursor: "pointer", background: "none", border: "none", outline: "none", padding: 0, textDecoration: "none" } as React.CSSProperties,
  };

  if (href) {
    return <a href={href} target={target} rel={rel} {...sharedProps} ref={containerRef as React.Ref<HTMLAnchorElement>}>{inner}</a>;
  }
  return <button {...sharedProps} ref={containerRef as React.Ref<HTMLButtonElement>}>{inner}</button>;
}
