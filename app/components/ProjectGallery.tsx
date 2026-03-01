"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  isMobile?: boolean;
}

export default function ProjectGallery({ images, title, isMobile = false }: ProjectGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [activeImage, setActiveImage] = useState(0);

  const galleryRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const handleImageChange = useCallback(
    (index: number) => {
      if (index === activeImage) return;

      // Animate current image out
      if (mainImageRef.current) {
        const currentImg = mainImageRef.current.querySelector(".main-image-active");
        if (currentImg) {
          gsap.to(currentImg, {
            opacity: 0,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              setActiveImage(index);
            },
          });
        } else {
          setActiveImage(index);
        }
      } else {
        setActiveImage(index);
      }
    },
    [activeImage]
  );

  // Animate new image in when activeImage changes
  useEffect(() => {
    if (!mainImageRef.current) return;
    const img = mainImageRef.current.querySelector(".main-image-active");
    if (img) {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeImage]);

  const goToNext = useCallback(() => {
    const nextIndex = (activeImage + 1) % images.length;
    handleImageChange(nextIndex);
  }, [activeImage, images.length, handleImageChange]);

  const goToPrev = useCallback(() => {
    const prevIndex = (activeImage - 1 + images.length) % images.length;
    handleImageChange(prevIndex);
  }, [activeImage, images.length, handleImageChange]);

  // Thumbnails stagger fade-in on scroll
  useGSAP(
    () => {
      if (!thumbnailsRef.current || isMobile) return;
      const thumbs = thumbnailsRef.current.querySelectorAll(".thumb-item");
      if (thumbs.length) {
        gsap.fromTo(
          thumbs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: thumbnailsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: galleryRef }
  );

  // GSAP-driven infinite scroll for mobile mockups (4+ images)
  useGSAP(
    () => {
      if (!isMobile || !scrollContainerRef.current || images.length < 4) return;

      const container = scrollContainerRef.current;
      // Calculate the width of one full set of images
      const items = container.querySelectorAll(".scroll-mockup-first");
      if (!items.length) return;

      // Wait a frame for layout
      requestAnimationFrame(() => {
        let totalWidth = 0;
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const style = window.getComputedStyle(item);
          totalWidth += rect.width + parseFloat(style.marginRight || "0") + parseFloat(style.marginLeft || "0");
        });
        // Account for gaps
        const gap = parseFloat(window.getComputedStyle(container).gap || "0");
        totalWidth += gap * (items.length - 1);

        const tween = gsap.to(container, {
          x: -totalWidth,
          duration: images.length * 4,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: number) => {
              return parseFloat(String(x)) % totalWidth;
            }),
          },
        });

        scrollTweenRef.current = tween;
      });
    },
    { scope: galleryRef, dependencies: [isMobile, images.length] }
  );

  // Pause/resume on hover for mobile scroll
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (scrollTweenRef.current) {
      gsap.to(scrollTweenRef.current, { timeScale: 0, duration: 0.5 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (scrollTweenRef.current) {
      gsap.to(scrollTweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  }, []);

  // Arrow hover animations
  const handleArrowEnter = useCallback((ref: React.RefObject<HTMLButtonElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, { x: ref === prevBtnRef ? -4 : 4, duration: 0.2, ease: "power2.out" });
    }
  }, []);

  const handleArrowLeave = useCallback((ref: React.RefObject<HTMLButtonElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, duration: 0.2, ease: "power2.out" });
    }
  }, []);

  const renderPlaceholder = (index: number) => (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <div className="text-center">
        <div
          className="text-4xl font-light text-neutral-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title.charAt(0)}
        </div>
        <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">
          Image {index + 1}
        </p>
      </div>
    </div>
  );

  const renderPhoneMockup = (img: string, index: number, key: string, className?: string) => (
    <div
      key={key}
      className={`relative flex-shrink-0 w-[200px] md:w-[240px] lg:w-[280px] aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-neutral-900 shadow-lg ${className || ""}`}
    >
      {/* Phone frame effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-neutral-700/50 pointer-events-none z-10" />
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-neutral-900 rounded-full z-20" />

      {imageErrors.has(index) ? (
        renderPlaceholder(index)
      ) : (
        <Image
          src={img}
          alt={`${title} - Screen ${index + 1}`}
          fill
          className="object-cover"
          onError={() => handleImageError(index)}
        />
      )}
    </div>
  );

  // Mobile layout: display all images side by side as phone mockups
  if (isMobile) {
    const shouldAutoScroll = images.length >= 4;

    if (shouldAutoScroll) {
      return (
        <div ref={galleryRef} className="overflow-hidden py-4">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 lg:gap-8"
            style={{ width: "fit-content" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* First set of images */}
            {images.map((img, index) => renderPhoneMockup(img, index, `first-${index}`, "scroll-mockup-first"))}
            {/* Duplicate set for seamless loop */}
            {images.map((img, index) => renderPhoneMockup(img, index, `second-${index}`))}
          </div>
        </div>
      );
    }

    // Static display for fewer images
    return (
      <div ref={galleryRef} className="flex justify-center gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-4">
        {images.map((img, index) => renderPhoneMockup(img, index, `static-${index}`))}
      </div>
    );
  }

  // Web layout: standard carousel with GSAP transitions
  const renderMainPlaceholder = (index: number) => (
    <div className="main-image-active absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
      <div className="text-center">
        <div
          className="text-6xl font-light text-neutral-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title.charAt(0)}
        </div>
        <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">
          Image {index + 1}
        </p>
      </div>
    </div>
  );

  return (
    <div ref={galleryRef}>
      {/* Main Image with Navigation */}
      <div ref={mainImageRef} className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 group">
        {imageErrors.has(activeImage) ? (
          renderMainPlaceholder(activeImage)
        ) : (
          <Image
            key={activeImage}
            src={images[activeImage]}
            alt={`${title} - Image ${activeImage + 1}`}
            fill
            className="main-image-active object-cover object-top"
            priority
            onError={() => handleImageError(activeImage)}
          />
        )}

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              ref={prevBtnRef}
              onClick={goToPrev}
              onMouseEnter={() => handleArrowEnter(prevBtnRef)}
              onMouseLeave={() => handleArrowLeave(prevBtnRef)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              ref={nextBtnRef}
              onClick={goToNext}
              onMouseEnter={() => handleArrowEnter(nextBtnRef)}
              onMouseLeave={() => handleArrowLeave(nextBtnRef)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5">
            <span
              className="text-xs font-light tracking-wider text-neutral-600"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {activeImage + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div ref={thumbnailsRef} className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`thumb-item relative flex-shrink-0 w-20 h-14 overflow-hidden bg-neutral-100 transition-all duration-300 ${
                activeImage === index
                  ? "ring-2 ring-neutral-900 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ opacity: 0 }}
            >
              {imageErrors.has(index) ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <span className="text-lg font-light text-neutral-300" style={{ fontFamily: "var(--font-display)" }}>
                    {title.charAt(0)}
                  </span>
                </div>
              ) : (
                <Image
                  src={img}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
