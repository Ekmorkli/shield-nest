import { useEffect, useState } from 'react';

export function MatrixRain() {
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    const numberOfDrops = 15;
    const initialDrops = Array.from({ length: numberOfDrops }, (_, i) => i * 50);
    setDrops(initialDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((delay, index) => (
        <div
          key={index}
          className="absolute w-px h-20 bg-gradient-to-b from-transparent via-shield-blue/30 to-transparent animate-matrix-rain"
          style={{
            left: `${(index * 6.67) % 100}%`,
            animationDelay: `${delay}ms`,
            animationDuration: `${4000 + Math.random() * 2000}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingBinaryCode() {
  const binaryStrings = [
    '01001001',
    '11010101',
    '10110010',
    '01110100',
    '11001010',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {binaryStrings.map((binary, index) => (
        <div
          key={index}
          className="absolute text-shield-green/20 text-xs font-mono animate-float opacity-30"
          style={{
            top: `${20 + (index * 15) % 60}%`,
            left: `${10 + (index * 20) % 80}%`,
            animationDelay: `${index * 1000}ms`,
            animationDuration: `${3000 + Math.random() * 2000}ms`,
          }}
        >
          {binary}
        </div>
      ))}
    </div>
  );
}

export function CircuitNodes() {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-1 h-1 bg-shield-blue rounded-full animate-circuit-pulse"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.id * 500}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function EnergyOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-shield-gold/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-shield-blue/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-shield-green/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
}