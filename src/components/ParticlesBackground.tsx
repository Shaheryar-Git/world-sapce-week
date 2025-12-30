import { useEffect, useState } from "react";
import generateParticles from "@/lib/particles";

const ParticlesBackground = ({ scrollY = 0, count = 200 }) => {
  const [particles] = useState(() => generateParticles(count));

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `calc(${p.top}% - ${scrollY * 0.2}px)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
