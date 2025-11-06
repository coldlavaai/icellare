// Saved Hero Section Blocks - Why Icellaré and Why Lifespan
// Can be reused later if needed

{/* Left side content - Why Icellaré */}
<motion.div
  className="absolute left-[8%] w-[25%] pointer-events-none"
  style={{ top: '200px' }}
  initial={{ opacity: 0, x: -40 }}
  animate={
    isLoadingComplete
      ? {
          opacity: Math.max(0, 1 - scrollProgress * 12),
          y: -(scrollProgress * 100),
          x: 0
        }
      : { opacity: 0, x: -40 }
  }
  transition={isLoadingComplete ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
>
  <h2 className="text-3xl font-serif text-black mb-3 tracking-wide">WHY ICELLARÉ?</h2>
  <h3 className="text-4xl font-serif italic text-[#8c734d] mb-6">We Sell Hope</h3>

  {/* Image under left subheading */}
  <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#B8860B]/30 mb-6 group cursor-pointer transition-all duration-300 hover:border-[#B8860B] hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] pointer-events-auto">
    <img
      src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/iStock-1096502334.jpg?v=1762456838"
      alt="Icellaré"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <p className="text-base font-sans text-black/80 leading-relaxed mb-4">
    Welcome to Icellare Lifespan Center.
  </p>
  <p className="text-base font-sans text-black/80 leading-relaxed mb-4">
    Where we specialise in state-of-the-art autologous stem cell technology, rejuvenation innovation, in depth genetics testing and personalized care.
  </p>
  <p className="text-base font-sans text-black/80 leading-relaxed mb-6">
    We believe in harnessing the power of your own cells, to allow you to become Your Best Self- the core of <span className="font-semibold">Icellaré</span> or <span className="italic">"cell of I."</span>
  </p>
</motion.div>

{/* Right side content - Why Lifespan */}
<motion.div
  className="absolute right-[8%] w-[25%] pointer-events-none text-right"
  style={{ top: '200px' }}
  initial={{ opacity: 0, x: 40 }}
  animate={
    isLoadingComplete
      ? {
          opacity: Math.max(0, 1 - scrollProgress * 12),
          y: -(scrollProgress * 100),
          x: 0
        }
      : { opacity: 0, x: 40 }
  }
  transition={isLoadingComplete ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
>
  <h2 className="text-3xl font-serif text-black mb-3 tracking-wide">WHY LIFESPAN?</h2>
  <h3 className="text-4xl font-serif italic text-[#8c734d] mb-6">Not a typical hospital</h3>

  {/* Image under right subheading */}
  <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#B8860B]/30 mb-6 group cursor-pointer transition-all duration-300 hover:border-[#B8860B] hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] pointer-events-auto">
    <img
      src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/Screenshot_2025-11-06_at_19.19.40.png?v=1762456844"
      alt="Lifespan"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <p className="text-base font-sans text-black/80 leading-relaxed mb-4">
    Your exclusive destination for regenerative medicine.
  </p>
  <p className="text-base font-sans text-black/80 leading-relaxed mb-4">
    We don't just offer hope; we craft a personalized wellness journey combining cutting-edge science with individualized care and attention for your unique needs.
  </p>
  <p className="text-base font-sans text-black/80 leading-relaxed mb-6">
    Embracing you <span className="font-semibold">from day 0 through your entire lifespan</span> with continuous support, innovation and dedicated expertise at every stage.
  </p>
</motion.div>
