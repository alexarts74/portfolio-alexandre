"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

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

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const goToNext = () => {
    const nextIndex = (activeImage + 1) % images.length;
    handleImageChange(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeImage - 1 + images.length) % images.length;
    handleImageChange(prevIndex);
  };

  const renderPlaceholder = (index: number, isMain: boolean = false) => (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 ${
        isMain && isTransitioning ? "opacity-0" : "opacity-100"
      } transition-opacity duration-500`}
    >
      <div className="text-center">
        <div
          className={`font-light text-neutral-300 ${isMain ? "text-6xl" : "text-2xl"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title.charAt(0)}
        </div>
        {isMain && (
          <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">
            Image {index + 1}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Main Image with Navigation */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 group">
        {imageErrors.has(displayedImage) ? (
          renderPlaceholder(displayedImage, true)
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
