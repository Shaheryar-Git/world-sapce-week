// utils/particles.js
const generateParticles = (count = 100) => {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 2 + Math.random() * 3,
  }));
};

export default generateParticles;
