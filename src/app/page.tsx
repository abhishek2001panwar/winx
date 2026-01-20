'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Sparkles, TrendingUp, Heart, Zap, Users, Award, Palette, Target, Lightbulb, ArrowRight } from 'lucide-react';
import Lenis from 'lenis';

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Update scroll progress state
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Section refs for story timeline
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Loading animation - slowed down
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 5; // Reduced from 15 to 5 for slower loading
      });
    }, 150); // Increased from 100 to 150ms

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Enhanced cursor with trail effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      setCursorTrail(prev => [
        ...prev.slice(-8), // Keep last 8 points
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    // Check if hovering over interactive elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(loadingInterval);
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* Full Page Loader */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="relative z-10">
            {/* Center content */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="mb-12 relative"
              >
                <motion.div
                  className="absolute inset-0 blur-3xl opacity-40"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.95, 1.1, 0.95],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img
                    src="https://winxmarketingmedia.in/wp-content/uploads/2025/06/cropped-COLLABORATIVE-SENIOR-CARE-2.png"
                    alt="WinX Logo"
                    className="w-80 h-auto"
                  />
                </motion.div>
                <motion.img
                  src="https://winxmarketingmedia.in/wp-content/uploads/2025/06/cropped-COLLABORATIVE-SENIOR-CARE-2.png"
                  alt="WinX Logo"
                  className="relative w-80 h-auto"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 20px rgba(196, 132, 252, 0.3))',
                      'drop-shadow(0 0 40px rgba(236, 72, 153, 0.5))',
                      'drop-shadow(0 0 20px rgba(196, 132, 252, 0.3))'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-10"
              >
                <motion.div 
                  className="text-6xl font-black bg-gradient-to-r from-violet-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '200%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  {Math.floor(loadingProgress)}%
                </motion.div>
              </motion.div>

              {/* Progress bar */}
              <div className="relative w-96">
                <div className="relative w-full h-2 bg-gray-900/50 rounded-full overflow-hidden backdrop-blur-xl border border-violet-500/20">
                  <motion.div
                    className="h-full relative"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-400 to-purple-500" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-pink-400 to-purple-500 origin-left z-[100] shadow-lg shadow-violet-500/50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Story Timeline */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
        {/* Vertical Line */}
        <div className="relative h-96 w-1 bg-gray-800/50 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 via-pink-400/20 to-purple-500/20 rounded-full blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-40 rounded-full" />
          
          {/* Animated Progress */}
          <motion.div 
            className="absolute top-0 left-0 right-0 origin-top rounded-full overflow-hidden"
            style={{ scaleY: scrollYProgress }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500 via-pink-400 to-purple-500">
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-400 via-pink-300 to-purple-400 blur-md opacity-60" />
        </div>

        {/* Section Markers with Enhanced Labels */}
        {[
          { label: 'Home', position: '2%', progress: 0 },
          { label: 'Stats', position: '22%', progress: 0.2 },
          { label: 'Services', position: '38%', progress: 0.35 },
          { label: 'Portfolio', position: '55%', progress: 0.52 },
          { label: 'Reviews', position: '72%', progress: 0.7 },
          { label: 'Contact', position: '92%', progress: 0.9 }
        ].map((section, index) => {
          const isPassed = scrollProgress >= section.progress;
          const isActive = scrollProgress >= section.progress && scrollProgress < (section.progress + 0.15);
          
          return (
            <motion.div
              key={section.label}
              className="absolute left-1/2 -translate-x-1/2 group z-10"
              style={{ top: section.position }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: section.progress, duration: 0.6 }}
            >
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: isPassed ? [1, 2, 1] : 1,
                  opacity: isPassed ? [0, 0.5, 0] : 0
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  boxShadow: '0 0 20px 4px rgba(196, 132, 252, 0.6)'
                }}
              />
              
              {/* Main dot */}
              <motion.div
                className="relative w-4 h-4 rounded-full cursor-pointer transition-all duration-500"
                whileHover={{ scale: 1.8 }}
                animate={{
                  background: isPassed
                    ? 'radial-gradient(circle, rgba(236, 72, 153, 1) 0%, rgba(196, 132, 252, 1) 100%)'
                    : 'radial-gradient(circle, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%)',
                  borderColor: isPassed ? '#c084fc' : '#6b7280',
                  boxShadow: isPassed
                    ? '0 0 20px rgba(196, 132, 252, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)'
                    : 'none'
                }}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid'
                }}
              >
                {/* White inner glow when active */}
                {isPassed && (
                  <motion.div
                    className="absolute inset-1 rounded-full bg-white/80"
                    animate={{
                      opacity: [0.8, 0.3, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Pulsing ring when active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-3 border-pink-400"
                    animate={{
                      scale: [1, 3, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {/* Enhanced label */}
              <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                <div className="relative">
                  {/* Glow behind label */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-pink-500/30 rounded-xl blur-xl" />
                  
                  {/* Label container */}
                  <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black px-4 py-2 rounded-xl border border-violet-500/50 backdrop-blur-xl shadow-2xl">
                    <span className="text-sm font-bold bg-gradient-to-r from-violet-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">
                      {section.label}
                    </span>
                    {/* Small indicator arrow */}
                    <motion.div
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-violet-400 rotate-45"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Branded Cursor */}
      <div className="fixed pointer-events-none z-[9999] hidden md:block">
        {/* Cursor Trail */}
        {cursorTrail.map((point) => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full bg-violet-400"
            initial={{ x: point.x - 4, y: point.y - 4, opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        
        {/* Main Cursor */}
        <motion.div
          className="absolute"
          animate={{
            x: cursorPos.x - 20,
            y: cursorPos.y - 20,
            scale: isHovering ? 1.3 : 1,
          }}
          transition={{ type: 'spring', stiffness: 1000, damping: 30, mass: 0.5 }}
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-400 rounded-full blur-xl opacity-40" />
          
          {/* Main Circle with Brand */}
          <motion.div 
            className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border-2 border-violet-400/50 flex items-center justify-center"
            animate={{ rotate: isHovering ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Gradient Border Animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #c084fc, #f472b6, #c084fc)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" />
            
            {/* WINX Text */}
            <span className="relative text-[8px] font-bold bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              WINX
            </span>
          </motion.div>
          
          {/* Orbiting Dots */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-2px',
                marginTop: '-2px',
                transformOrigin: `2px ${18 + (isHovering ? 8 : 0)}px`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0,
        }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[90] p-4 bg-gradient-to-r from-violet-500 to-pink-400 rounded-full shadow-2xl shadow-violet-500/50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      <Navigation />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WorkSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <img
            src="https://winxmarketingmedia.in/wp-content/uploads/2025/06/cropped-COLLABORATIVE-SENIOR-CARE-2.png"
            alt="WinX Logo"
            className="h-12 w-auto"
          />
        </motion.div>
        <div className="hidden md:flex gap-8">
          {['About', 'Services', 'Team', 'Work', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.1, color: '#c084fc' }}
              className="text-sm font-medium transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-violet-500 to-pink-400 px-6 py-2 rounded-full text-sm font-medium"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: scale }}>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-pink-900/30"
        />
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${20 * i}%`,
              top: `${15 * i}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        {/* Enhanced particles - static */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              background: i % 3 === 0 ? '#c084fc' : i % 3 === 1 ? '#f9a8d4' : '#67e8f9',
              opacity: 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        style={{ opacity, y }} 
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 backdrop-blur-xl"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
                ✨ Award Winning Digital Agency
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block"
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-violet-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                Turning
              </span>
            </motion.span>
            {' '}
            <motion.span 
              className="inline-block"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-pink-300 via-violet-400 to-pink-300 bg-clip-text text-transparent">
                Brands
              </span>
            </motion.span>
            <br />
            <motion.span
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-gradient-to-r from-pink-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Into Obsessions
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          It&apos;s <motion.span 
            animate={{ color: ['#f9a8d4', '#c084fc', '#f9a8d4'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-bold"
          >2 AM</motion.span>, and someone&apos;s still scrolling through your content because they literally can&apos;t stop. 
          <br className="hidden md:block" />
          <motion.span 
            whileHover={{ scale: 1.05, display: 'inline-block' }}
            className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent font-semibold"
          >
            That&apos;s not luck, that&apos;s WinX magic.
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 50px rgba(196, 132, 252, 0.6)',
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-gradient-to-r from-violet-500 to-pink-400 px-8 py-3 rounded-full text-base font-semibold shadow-2xl shadow-violet-500/50 overflow-hidden"
          >
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              borderColor: '#c084fc',
              boxShadow: '0 0 30px rgba(196, 132, 252, 0.3)',
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/30 px-8 py-3 rounded-full text-base font-semibold backdrop-blur-xl hover:bg-white/5 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View Our Magic
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.2 }}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-violet-400 blur-xl"
              />
              <Sparkles className="relative w-10 h-10 text-violet-400" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-20 left-10 md:left-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 backdrop-blur-xl border border-violet-400/30" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-10 md:right-32"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 backdrop-blur-xl border border-pink-400/30" />
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  
  const stats = [
    { label: 'Client Satisfaction', value: 95, suffix: '%', icon: Award },
    { label: 'Average ROI Increase', value: 300, suffix: '%', icon: TrendingUp },
    { label: 'Successful Campaigns', value: 99, suffix: '%', icon: Zap },
  ];

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} delay={index * 0.2} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedStat({ label, value, suffix, icon: Icon, delay, isInView }: any) {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        rotateZ: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-pink-500/0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
        animate={isHovered ? {
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="relative bg-gradient-to-br from-violet-900/40 to-pink-900/20 backdrop-blur-2xl p-8 rounded-3xl border border-violet-500/30 group-hover:border-violet-400/60 transition-all duration-500 overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: isHovered ? [0, 1, 0] : 0,
                scale: [0, 1.5, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.div
          animate={{ 
            rotate: isHovered ? [0, 360] : [0, 5, -5, 0],
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 0.8 },
            scale: { duration: 0.3 }
          }}
          className="inline-block mb-6 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-300 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Icon className="relative w-12 h-12 text-violet-300" />
        </motion.div>

        <div className="relative">
          <motion.div 
            className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent mb-2"
            animate={isHovered ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              animate={{ 
                textShadow: isHovered 
                  ? ['0 0 20px rgba(196, 132, 252, 0.5)', '0 0 40px rgba(196, 132, 252, 0.8)', '0 0 20px rgba(196, 132, 252, 0.5)']
                  : '0 0 0px rgba(196, 132, 252, 0)'
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {count}
            </motion.span>
            {suffix}
          </motion.div>
          <div className="text-gray-300 text-lg font-medium">{label}</div>
        </div>

        {/* Animated corner decoration */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-violet-400/50 rounded-tr-lg"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, -5]);

  const services = [
    {
      icon: Heart,
      title: 'Brand Identity',
      description: 'We craft brand stories that resonate emotionally with your audience, making your brand unforgettable.',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: Sparkles,
      title: 'Content Creation',
      description: 'Content so engaging, your audience won\'t be able to stop scrolling - even at 2 AM.',
      gradient: 'from-violet-400 to-purple-400',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: '300% average ROI increase. We don\'t just run campaigns, we create movements.',
      gradient: 'from-cyan-400 to-blue-400',
    },
    {
      icon: Users,
      title: 'Social Media',
      description: 'Turn your social presence into a conversation your audience craves to be part of.',
      gradient: 'from-violet-400 to-pink-300',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-20 relative">
      {/* Animated background gradient with scroll */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-pink-500/5"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              What We Do Best
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We don&apos;t just deliver services - we partner with you to create brand experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
              whileHover={{ scale: 1.03, y: -8, rotateX: 5 }}
              className="group relative cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Subtle animated border gradient */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/50 via-pink-400/50 to-violet-500/50 rounded-3xl opacity-0 group-hover:opacity-60 blur-md"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              {/* Reduced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 from-violet-500/20 to-pink-400/20 rounded-3xl" />
              
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 group-hover:border-violet-500/40 transition-all duration-500 overflow-hidden">
                {/* Background animated mesh */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 shadow-2xl`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="relative text-2xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-pink-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="relative text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Animated arrow */}
                <motion.div
                  className="mt-6 flex items-center gap-2 text-violet-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span>Learn More</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>

                {/* Corner decorations */}
                <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-violet-500/20 rounded-bl-xl group-hover:border-violet-400/50 transition-colors duration-300" />
                <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-pink-500/20 rounded-tr-xl group-hover:border-pink-400/50 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const works = [
    {
      title: 'House of Bliss',
      subtitle: 'From Unknown to Unmissable',
      description: 'Every photographer thinks they\'re the next big thing, but House of Bliss actually became it.',
      link: 'https://houseofbliss.co.in/',
      instagram: 'https://www.instagram.com/houseofbliss.in/',
      gradient: 'from-violet-400 to-purple-400',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80'
    },
    {
      title: 'Collaborative Senior Care',
      subtitle: 'Rewriting Healthcare\'s Story',
      description: 'Healthcare marketing transformed into something people actually want to engage with.',
      link: 'https://collaborativeseniorcare.com/',
      gradient: 'from-pink-400 to-rose-400',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    },
    {
      title: 'Classy Captures',
      subtitle: 'The Art of Timeless Wedding Photography',
      description: 'Wedding photography transformed into preserving emotions that deserve to live forever.',
      link: 'https://classycaptures.com/',
      instagram: 'https://www.instagram.com/classycaptures_official',
      gradient: 'from-cyan-400 to-blue-400',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
    }
  ];

  return (
    <section id="work" ref={ref} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-transparent to-violet-500/5"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 text-sm font-semibold text-violet-400">
              Our Portfolio
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              Less Talking, More Showing
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The proof is in the scroll. Here&apos;s how we helped brands become impossible to ignore.
          </p>
        </motion.div>

        {/* Central connection point with animated lines to all 3 cards */}
        <div className="relative hidden md:block" style={{ height: '300px', marginBottom: '3rem' }}>
          {/* Central glowing node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30"
          >
            <motion.div
              className="relative w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-pink-400"
              animate={{
                boxShadow: [
                  '0 0 20px 5px rgba(196, 132, 252, 0.6)',
                  '0 0 40px 10px rgba(236, 72, 153, 0.8)',
                  '0 0 20px 5px rgba(196, 132, 252, 0.6)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-400"
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* SVG for curved lines */}
          <svg 
            className="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: '300px' }}
          >
            <defs>
              <linearGradient id="gradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="gradCenter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="gradRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Line to left card */}
            <motion.path
              d="M 600 40 Q 350 100, 200 290"
              fill="none"
              stroke="url(#gradLeft)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            />

            {/* Line to center card */}
            <motion.path
              d="M 600 40 L 600 290"
              fill="none"
              stroke="url(#gradCenter)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />

            {/* Line to right card */}
            <motion.path
              d="M 600 40 Q 850 100, 1000 290"
              fill="none"
              stroke="url(#gradRight)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />

            {/* Animated dots - moving forward only */}
            <motion.circle
              r="3"
              fill="#c084fc"
              opacity="0"
              style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                repeatCount="indefinite"
              />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 600 40 Q 350 100, 200 290"
              />
            </motion.circle>

            <motion.circle
              r="3"
              fill="#ec4899"
              opacity="0"
              style={{ filter: 'drop-shadow(0 0 6px #ec4899)' }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                repeatCount="indefinite"
                begin="0.3s"
              />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin="0.3s"
                path="M 600 40 L 600 290"
              />
            </motion.circle>

            <motion.circle
              r="3"
              fill="#22d3ee"
              opacity="0"
              style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                repeatCount="indefinite"
                begin="0.6s"
              />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin="0.6s"
                path="M 600 40 Q 850 100, 1000 290"
              />
            </motion.circle>
          </svg>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                {/* Animated glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${work.gradient} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 rounded-3xl`} />
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-gray-800 group-hover:border-violet-400/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${work.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 bg-gradient-to-r ${work.gradient} bg-clip-text group-hover:text-transparent`}>
                      {work.title}
                    </h3>
                    
                    <p className="text-violet-400 font-medium mb-3 text-sm">
                      {work.subtitle}
                    </p>

                    <p className="text-gray-400 leading-relaxed flex-grow mb-4">
                      {work.description}
                    </p>

                    {/* Links */}
                    <div className="flex gap-3 mt-auto">
                      <motion.a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className={`flex-1 py-2 px-4 rounded-xl bg-gradient-to-r ${work.gradient} text-white font-semibold text-center text-sm`}
                      >
                        View Site
                      </motion.a>
                      {work.instagram && (
                        <motion.a
                          href={work.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="py-2 px-4 rounded-xl border border-violet-400/50 text-violet-400 font-semibold text-center text-sm hover:bg-violet-400/10 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${work.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} 
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Work Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://winxmarketingmedia.in/our-work/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-bold shadow-2xl shadow-violet-500/50 relative overflow-hidden group"
          >
            <span className="relative z-10">View All Our Work</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              →
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const headerRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const team = [
    {
      name: 'Sangeetha Singh',
      role: 'Co-Founder',
      description: 'Visionary leader driving brand excellence and creative innovation.',
      image: 'https://winxmarketingmedia.in/wp-content/uploads/2025/06/Untitled-design-29.png',
      gradient: 'from-violet-400 to-purple-400',
    },
    {
      name: 'M N K Khajukathara',
      role: 'Co-Founder',
      description: 'Strategic mind behind transformative marketing solutions.',
      image: 'https://winxmarketingmedia.in/wp-content/uploads/2025/06/2-1.png',
      gradient: 'from-pink-300 to-rose-300',
    },
  ];

  return (
    <section id="team" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-pink-900/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              Meet The Dream Team
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The creative minds behind your brand&apos;s transformation
          </p>
        </motion.div>

        {/* Central connection point with diagonal lines to 2 cards */}
        <div className="relative hidden md:block" style={{ height: '280px', marginBottom: '3rem' }}>
          {/* Central glowing node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30"
          >
            <motion.div
              className="relative w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-pink-400"
              animate={{
                boxShadow: [
                  '0 0 20px 5px rgba(196, 132, 252, 0.6)',
                  '0 0 40px 10px rgba(236, 72, 153, 0.8)',
                  '0 0 20px 5px rgba(196, 132, 252, 0.6)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-pink-400"
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* SVG for diagonal lines */}
          <svg 
            className="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 280"
            preserveAspectRatio="xMidYMid meet"
            style={{ height: '280px' }}
          >
            <defs>
              <linearGradient id="teamGradLeft" x1="50%" y1="0%" x2="20%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="teamGradRight" x1="50%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Diagonal line to left card */}
            <motion.path
              d="M 500 40 Q 380 120, 250 270"
              fill="none"
              stroke="url(#teamGradLeft)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            />

            {/* Diagonal line to right card */}
            <motion.path
              d="M 500 40 Q 620 120, 750 270"
              fill="none"
              stroke="url(#teamGradRight)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />

            {/* Animated dots - moving forward only */}
            <motion.circle
              r="3"
              fill="#c084fc"
              opacity="0"
              style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                repeatCount="indefinite"
              />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 500 40 Q 380 120, 250 270"
              />
            </motion.circle>

            <motion.circle
              r="3"
              fill="#f9a8d4"
              opacity="0"
              style={{ filter: 'drop-shadow(0 0 6px #f9a8d4)' }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                repeatCount="indefinite"
                begin="0.4s"
              />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin="0.4s"
                path="M 500 40 Q 620 120, 750 270"
              />
            </motion.circle>
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                {/* Animated background glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 group-hover:border-violet-400/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                  {/* Image container with animated background */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-6"
                  >
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${member.gradient} p-1`}>
                      <div className="w-full h-full bg-black rounded-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Name with gradient on hover */}
                  <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 bg-gradient-to-r ${member.gradient} bg-clip-text group-hover:text-transparent`}>
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-violet-400 font-medium mb-4 text-lg">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {member.description}
                  </p>

                  {/* Decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-1 bg-gradient-to-r ${member.gradient} rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-lg italic">
            &quot;Individually talented, collectively unstoppable&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'V. Preetham Raju',
      role: 'CEO',
      company: "IT'S FOREVER",
      text: 'We thought we were just getting help with marketing. Instead, we found our brand voice. The WinX team truly understands what we stand for.',
      rating: 5,
    },
    {
      name: 'Santhosh Sridhar',
      role: 'Founder',
      company: 'SSSS CATERING',
      text: 'Our food has always spoken for itself, but online it needed a voice. WinX made our visuals and brand look as rich and authentic as the experience we serve.',
      rating: 5,
    },
    {
      name: 'Jordan',
      role: 'Founder',
      company: 'COLLABORATIVE SENIOR CARE',
      text: 'In elder care, communication needs to be handled with empathy and trust. WinX helped us express that with true professionalism.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="work" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
        </motion.div>

        <div className="relative h-80">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 0.8,
                x: index === currentIndex ? 0 : index < currentIndex ? -100 : 100,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 ${index === currentIndex ? 'z-10' : 'z-0'}`}
            >
              <div className="bg-gradient-to-br from-violet-900/30 to-pink-900/20 backdrop-blur-xl p-10 rounded-3xl border border-violet-500/20 h-full flex flex-col justify-center">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xl text-gray-300 mb-6 text-center italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="text-center">
                  <h4 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-violet-500 to-pink-400 w-10'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 backdrop-blur-xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              Let&apos;s Create Magic Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to turn your brand into everyone&apos;s obsession? Let&apos;s make it happen.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info Cards - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Phone Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 group-hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Call Us</h3>
                    <p className="text-lg font-bold text-white">+91 8197519556</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 group-hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Email Us</h3>
                    <p className="text-lg font-bold text-white">winxmedia23@gmail.com</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 group-hover:border-violet-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-violet-400 to-pink-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Visit Us</h3>
                    <p className="text-base font-bold text-white">WeWork Galaxy, Bengaluru</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/winxmedia.in', gradient: 'from-pink-500 to-rose-500' },
                { icon: Facebook, href: '#', gradient: 'from-blue-500 to-indigo-500' },
                { icon: Youtube, href: '#', gradient: 'from-red-500 to-rose-500' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/social"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} rounded-xl blur-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-300`} />
                  <div className={`relative p-4 rounded-xl bg-gradient-to-r ${social.gradient}`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <div className="relative">
              {/* Form glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-pink-400 to-violet-500 rounded-3xl blur-2xl opacity-20" />
              
              <form className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/50 to-pink-500/50 rounded-2xl blur-xl transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-100' : 'opacity-0'}`} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="relative w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-400 transition-all duration-300 text-white placeholder-gray-500"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-2xl blur-xl transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="relative w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-400 transition-all duration-300 text-white placeholder-gray-500"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-2xl blur-xl transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-100' : 'opacity-0'}`} />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    rows={6}
                    className="relative w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-2xl focus:outline-none focus:border-pink-400 transition-all duration-300 resize-none text-white placeholder-gray-500"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-400 to-violet-500 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative bg-gradient-to-r from-violet-500 to-pink-400 px-8 py-4 rounded-2xl text-base font-bold shadow-2xl">
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </motion.button>

                {/* Decorative corner elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl" />
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-2xl" />
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <img
                src="https://winxmarketingmedia.in/wp-content/uploads/2025/06/cropped-COLLABORATIVE-SENIOR-CARE-2.png"
                alt="WinX Logo"
                className="h-16 w-auto"
              />
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Turning brands into everyone&apos;s obsession through creative storytelling and strategic marketing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Team', 'Work'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ x: 5, color: '#c084fc' }}
                    className="text-gray-400 text-sm hover:text-violet-400 transition-all inline-flex items-center gap-2"
                  >
                    <span>→</span> {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {['Brand Identity', 'Content Creation', 'Digital Marketing', 'Social Media'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#services"
                    whileHover={{ x: 5, color: '#c084fc' }}
                    className="text-gray-400 text-sm hover:text-violet-400 transition-all inline-flex items-center gap-2"
                  >
                    <span>→</span> {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-violet-400" />
                <span>+91 8197519556</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-violet-400" />
                <span>winxmedia23@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-violet-400" />
                <span>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-sm text-center md:text-left"
          >
            © 2026 Winx Marketing Media. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Instagram, href: 'https://www.instagram.com/winxmedia.in', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Youtube, href: '#', label: 'Youtube' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-violet-500/20 border border-gray-700 hover:border-violet-500/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 hover:text-violet-400 transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ color: '#c084fc' }}
                className="text-gray-400 text-sm hover:text-violet-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Made with love badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 pt-8 border-t border-gray-800/50"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-pink-400"
            >
              ❤️
            </motion.span>
            by Winx Media Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
