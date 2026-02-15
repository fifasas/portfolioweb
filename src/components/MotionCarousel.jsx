import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../lib/utils';

const MotionCarousel = ({ reviews = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Carousel Wrapper */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_70%] px-4">
              <motion.div
                animate={{ 
                  scale: selectedIndex === index ? 1 : 0.8,
                  opacity: selectedIndex === index ? 1 : 0.3
                }}
                transition={{ 
                  scale: { duration: 0.5 },
                  opacity: { duration: 0.5 }
                }}
                className="relative h-full flex flex-col items-center text-center py-12"
              >
                <Quote className="text-primary opacity-40 mb-10 animate-pulse" size={40} />
                
                <h3 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-16 text-white max-w-3xl">
                  "{review.text}"
                </h3>

                <div className="flex flex-col items-center group">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 p-1 relative z-10">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-primary">{review.name[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tighter">{review.name}</h4>
                  <p className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mt-2">{review.role}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-8 mt-12">
        <button 
          onClick={scrollPrev}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                selectedIndex === index ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <button 
          onClick={scrollNext}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MotionCarousel;
