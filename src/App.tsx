/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Gift, MessageCircle, Sparkles, Star, ChevronDown } from 'lucide-react';

// --- Components ---

const FloatingTeddies = () => {
  const [teddies, setTeddies] = useState<{ id: number; left: string; top: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newTeddies = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 20}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
    }));
    setTeddies(newTeddies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      {teddies.map((teddy) => (
        <motion.div
          key={teddy.id}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{ 
            y: [0, -20, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: parseFloat(teddy.duration),
            repeat: Infinity,
            delay: parseFloat(teddy.delay),
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: teddy.left,
            top: teddy.top,
            fontSize: teddy.size,
          }}
        >
          🧸
        </motion.div>
      ))}
    </div>
  );
};

const FloatingHearts = ({ trigger }: { trigger: number }) => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newHearts = Array.from({ length: 25 }).map((_, i) => ({
        id: Date.now() + i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 15 + 10}px`,
        duration: `${Math.random() * 4 + 3}s`,
      }));
      setHearts((prev) => [...prev, ...newHearts]);
      
      const timer = setTimeout(() => {
        setHearts((prev) => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart text-rose-400/80"
          style={{
            left: heart.left,
            bottom: '-40px',
            fontSize: heart.size,
            animationDuration: heart.duration,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function App() {
  const [surpriseCount, setSurpriseCount] = useState(0);

  const triggerSurprise = () => {
    setSurpriseCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden bg-[#fff9fa]">
      {/* Background Elements */}
      <FloatingTeddies />
      <FloatingHearts trigger={surpriseCount} />

      {/* Hero Section - Soft & Airy */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[100px] animate-pulse" />
           <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-amber-100/40 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-rose-400 font-bold">
              A Celebration of You
            </span>
          </motion.div>
          
          <h1 className="font-display text-6xl md:text-9xl font-light text-[#4a3a3c] tracking-tight mb-8 leading-[0.9]">
            Happy Birthday, <br />
            <span className="font-serif italic text-rose-500 text-glow">
              <TypingText text="Saranya" />
            </span>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="flex flex-col items-center gap-12"
          >
            <p className="text-[#8a7275] max-w-lg mx-auto text-lg font-light leading-relaxed tracking-wide">
              In a world of fleeting moments, some people leave a lasting light. Today, we celebrate yours.
            </p>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mt-4 opacity-40"
            >
              <ChevronDown className="w-6 h-6 text-rose-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Message Section - Soft Editorial Style */}
      <section className="py-32 px-6 md:py-48 bg-white/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start"
          >
            <div className="sticky top-32">
              <h2 className="font-display text-5xl text-[#4a3a3c] leading-tight">
                A Letter <br />
                <span className="font-serif italic text-rose-500">to Saranya</span>
              </h2>
              <div className="w-12 h-px bg-rose-300 mt-8" />
            </div>

            <div className="space-y-10 text-xl text-[#6d5a5d] font-light leading-relaxed font-serif italic">
              <p className="first-letter:text-7xl first-letter:font-display first-letter:text-rose-500 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                I wanted to take a moment to celebrate you today. Not just because it's your birthday, but because of the incredible person you are every single day.
              </p>
              <p>
                Your presence has a way of making everything a bit brighter. Whether it's the way you smile or the kindness you show to everyone around you, you truly are one of a kind. I feel so lucky to know you.
              </p>
              <p>
                On this special day, I hope you're surrounded by all the love and happiness you deserve. May this year bring you closer to all your dreams and fill your heart with joy.
              </p>
              <p>
                Keep being exactly who you are. The world is better with you in it.
              </p>
              
              <div className="pt-12 border-t border-rose-100">
                <p className="text-sm uppercase tracking-[0.3em] text-rose-400 font-sans not-italic mb-2 font-semibold">
                  With warmth and respect,
                </p>
                <p className="text-2xl text-[#4a3a3c] font-display not-italic">
                  Shashwat
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wishes Section - Soft Pink Cards */}
      <section className="py-32 px-6 bg-[#fff9fa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.6em] text-rose-500 font-bold mb-4 block">Intentions</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#4a3a3c]">Wishes for Your Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Endless Joy", desc: "May your laughter echo through every room you enter, bringing light to everyone.", icon: Sparkles },
              { title: "True Peace", desc: "May you find calm in the chaos and discover beauty in the quietest moments.", icon: Star },
              { title: "Great Success", desc: "May every path you choose lead you exactly where your heart desires to be.", icon: Gift },
            ].map((wish, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -8 }}
                className="glass p-10 rounded-[2.5rem] hover:bg-white/90 transition-all duration-500 group shadow-sm"
              >
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-rose-200 transition-colors">
                  <wish.icon className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-2xl font-display text-[#4a3a3c] mb-4">{wish.title}</h3>
                <p className="text-[#8a7275] font-light leading-relaxed">{wish.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Surprise Section - Romantic CTA */}
      <section className="py-48 px-6 bg-white/60 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-200/40 rounded-full blur-[150px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#4a3a3c] mb-12 leading-tight">
            A Moment of <br />
            <span className="font-serif italic text-rose-500">Pure Magic</span>
          </h2>
          
          <button
            onClick={triggerSurprise}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-medium tracking-widest text-white transition duration-300 ease-out bg-rose-500 rounded-full shadow-xl shadow-rose-200/50 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-rose-700 group-hover:translate-x-0 ease">
              <Gift className="w-5 h-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Click for a Surprise
            </span>
            <span className="relative invisible">Click for a Surprise</span>
          </button>
          
          <p className="mt-8 text-rose-400/60 text-[10px] uppercase tracking-[0.4em] font-bold">
            Experience the magic as many times as you wish
          </p>
        </motion.div>
      </section>

      {/* Final Section - Soft Romantic Footer */}
      <footer className="py-32 px-6 bg-[#fff9fa] text-center border-t border-rose-100">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <p className="font-serif italic text-3xl md:text-4xl text-[#6d5a5d] max-w-2xl mx-auto leading-relaxed">
            "I hope this small surprise made you smile today 💫"
          </p>
          
          <div className="flex justify-center gap-6 mt-16 opacity-30">
            <div className="w-12 h-px bg-rose-300" />
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <div className="w-12 h-px bg-rose-300" />
          </div>
          
          <div className="mt-24 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.8em] text-rose-400 font-bold">
              Saranya • 2026
            </p>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#8a7275]">
              Forever Inspired by Your Light
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
