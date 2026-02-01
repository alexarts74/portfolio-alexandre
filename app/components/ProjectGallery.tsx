"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  isMobile?: boolean;
}

export default function ProjectGallery({ images, title, isMobile = false }: ProjectGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [activeImage, setActiveImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(0);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const handleImageChange = (index: number) => {
    if (index === activeImage || isTransitioning) return;

    setIsTransitioning(true);
    setActiveImage(index);

    setTimeout(() => {
      setDisplayedImage(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const goToNext = () => {
    const nextIndex = (activeImage + 1) % images.length;
    handleImageChange(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeImage - 1 + images.length) % images.length;
    handleImageChange(prevIndex);
  };

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

  const renderPhoneMockup = (img: string, index: number, key: string) => (
    <div
      key={key}
      className="relative flex-shrink-0 w-[200px] md:w-[240px] lg:w-[280px] aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-neutral-900 shadow-lg"
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
    // Auto-scroll for 4+ images
    const shouldAutoScroll = images.length >= 4;

    if (shouldAutoScroll) {
      return (
        <div className="overflow-hidden py-4">
          <div
            className="flex gap-4 md:gap-6 lg:gap-8 animate-scroll"
            style={{
              width: "fit-content",
            }}
          >
            {/* First set of images */}
            {images.map((img, index) => renderPhoneMockup(img, index, `first-${index}`))}
            {/* Duplicate set for seamless loop */}
            {images.map((img, index) => renderPhoneMockup(img, index, `second-${index}`))}
          </div>
        </div>
      );
    }

    // Static display for fewer images
    return (
      <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-4">
        {images.map((img, index) => renderPhoneMockup(img, index, `static-${index}`))}
      </div>
    );
  }

  // Web layout: standard carousel
  const renderMainPlaceholder = (index: number) => (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } transition-opacity duration-500`}
    >
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
    <div>
      {/* Main Image with Navigation */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 group">
        {imageErrors.has(displayedImage) ? (
          renderMainPlaceholder(displayedImage)
        ) : (
          <Image
            src={images[displayedImage]}
            alt={`${title} - Image ${displayedImage + 1}`}
            fill
            className={`object-cover transition-all duration-500 ease-out ${
              isTransitioning ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
            }`}
            priority
            onError={() => handleImageError(displayedImage)}
          />
        )}

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
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
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`relative flex-shrink-0 w-20 h-14 overflow-hidden bg-neutral-100 transition-all duration-300 ${
                activeImage === index
                  ? "ring-2 ring-neutral-900 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
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
