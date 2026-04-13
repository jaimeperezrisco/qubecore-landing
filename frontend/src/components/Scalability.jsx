import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Scalability = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Configuración de nodos para desktop
  const nodes = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 30, y: 30 },
    { id: 3, x: 70, y: 30 },
    { id: 4, x: 20, y: 60 },
    { id: 5, x: 50, y: 20 },
    { id: 6, x: 80, y: 60 },
    { id: 7, x: 35, y: 75 },
    { id: 8, x: 65, y: 75 },
    { id: 9, x: 50, y: 85 },
    { id: 10, x: 15, y: 40 },
    { id: 11, x: 85, y: 40 },
    { id: 12, x: 50, y: 10 },
  ];

  // Conexiones entre nodos
  const connections = [
    [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 5], [3, 5], [4, 7], [6, 8],
    [7, 9], [8, 9], [10, 2], [11, 3],
    [12, 5], [10, 4], [11, 6],
  ];

  // Nodos simplificados para mobile (triángulo)
  const mobileNodes = [
    { id: 1, x: 50, y: 20 },
    { id: 2, x: 25, y: 70 },
    { id: 3, x: 75, y: 70 },
  ];

  const mobileConnections = [[1, 2], [2, 3], [3, 1]];

  return (
    <section id="scalability" className="section bg-[var(--bg-secondary)] relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solutions That <span className="text-gradient">Scale</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            From single qubits to enterprise-scale quantum systems. Our infrastructure grows with your computational needs.
          </p>
        </motion.div>

        {/* Desktop: Animación de red expandiéndose */}
        <div className="hidden md:block relative h-96">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Líneas de conexión */}
            {connections.map(([start, end], index) => {
              const startNode = nodes[start - 1];
              const endNode = nodes[end - 1];
              
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke="var(--accent-cyan)"
                  strokeWidth="0.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              );
            })}

            {/* Nodos */}
            {nodes.map((node, index) => (
              <g key={`node-${node.id}`}>
                {/* Glow effect */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="2"
                  fill="var(--accent-cyan)"
                  opacity="0.3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                  transition={{
                    duration: 2,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                {/* Core node */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="0.8"
                  fill="var(--accent-cyan)"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Mobile: Triángulo con pulsos */}
        <div className="md:hidden relative h-80">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Líneas de conexión */}
            {mobileConnections.map(([start, end], index) => {
              const startNode = mobileNodes[start - 1];
              const endNode = mobileNodes[end - 1];
              
              return (
                <g key={`mobile-line-${index}`}>
                  <motion.line
                    x1={startNode.x}
                    y1={startNode.y}
                    x2={endNode.x}
                    y2={endNode.y}
                    stroke="var(--accent-cyan)"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                  {/* Pulso de energía */}
                  <motion.circle
                    r="1.5"
                    fill="var(--accent-cyan)"
                    initial={{ 
                      offsetDistance: '0%',
                      opacity: 1 
                    }}
                    animate={{
                      offsetDistance: '100%',
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.7,
                    }}
                    style={{
                      offsetPath: `path('M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}')`,
                    }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${index * 0.7}s`}
                    >
                      <mpath xlinkHref={`#path-${index}`} />
                    </animateMotion>
                  </motion.circle>
                  <path
                    id={`path-${index}`}
                    d={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    fill="none"
                  />
                </g>
              );
            })}

            {/* Nodos */}
            {mobileNodes.map((node) => (
              <g key={`mobile-node-${node.id}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="3"
                  fill="var(--accent-cyan)"
                  opacity="0.3"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1.5"
                  fill="var(--accent-cyan)"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Scalability;
