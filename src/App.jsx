import { useState, useEffect } from "react";
import krathongImg from "./assets/krathong.png";
import person1 from "./assets/ff.jpg";
import person2 from "./assets/tt.jpg";

export default function App() {
  const [krathongs, setKrathongs] = useState([]);
  const [fireworks, setFireworks] = useState([]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.height - 60;
    const newKrathong = { id: Date.now(), x, y };
    setKrathongs([...krathongs, newKrathong]);
  };

  useEffect(() => {
    const colors = [
      "#f87171",
      "#facc15",
      "#60a5fa",
      "#f472b6",
      "#4ade80",
      "#a78bfa",
    ];
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        left: Math.random() * 90 + "%",
        top: Math.random() * 30 + "%",
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFireworks((prev) => [...prev.slice(-15), newFirework]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between
                 bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-700 text-white overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full shadow-[0_0_100px_rgba(255,255,180,0.7)] animate-[float_6s_infinite]" />

      {fireworks.map((f) => (
        <div
          key={f.id}
          className="firework"
          style={{ left: f.left, top: f.top, color: f.color }}
        ></div>
      ))}

      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[250px] overflow-hidden z-0">
        <div className="wave-layer wave1"></div>
        <div className="wave-layer wave2"></div>
        <div className="wave-layer wave3"></div>
      </div>

      {krathongs.map((k) => (
        <div
          key={k.id}
          className="absolute flex flex-col items-center animate-float-wave-full z-20"
          style={{
            left: "50%", 
            bottom: "130px",
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <div className="flex -space-x-2 mb-3">
            <img
              src={person1}
              alt="person1"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            {/* <img
              src={person2}
              alt="person2"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            /> */}
          </div>

          <img src={krathongImg} alt="krathong" className="w-48" />
        </div>
      ))}

      {/* Footer */}
      <footer className="absolute bottom-4 text-lg z-20">
        ขอให้สมหวังทุกประการ 🌙✨ Have a good day nakaa
      </footer>
    </div>
  );
}
