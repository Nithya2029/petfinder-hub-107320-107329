import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * ImageCarousel Component
 * Displays a main image and a row of thumbnails (if multiple images). Supports left/right navigation.
 * Props:
 *   images: array of image URLs (string). First image is shown by default.
 *   alt: alt text for the image(s).
 *   width/height: dimensions (optional).
 */
function ImageCarousel({ images = [], alt = "Pet Image", width = "100%", height = "260px" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    // Fallback if no images
    return (
      <div
        style={{
          width,
          height,
          background: "linear-gradient(120deg, var(--accent) 60%, var(--secondary) 100%)",
          borderRadius: "var(--radius)",
          minHeight: 180,
        }}
      />
    );
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="pet-carousel-root" style={{ position: "relative", width: width, margin: "0 auto" }}>
      {/* Main Image */}
      <div
        className="pet-carousel-mainimg"
        style={{
          borderRadius: "var(--radius)",
          background: "#ececec",
          width: "100%",
          height,
          overflow: "hidden",
          position: "relative"
        }}
      >
        <img
          src={images[activeIndex]}
          alt={alt}
          style={{
            width: "100%",
            height,
            objectFit: "cover",
            borderRadius: "var(--radius)",
            display: "block"
          }}
          loading="eager"
        />
        {images.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              className="carousel-btn prev"
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.78)",
                borderRadius: "50%",
                fontSize: "1.5rem",
                width: 36,
                height: 36,
                border: "none",
                zIndex: 3,
                cursor: "pointer",
                boxShadow: "0 1.5px 8px 0 rgba(110,198,246,0.10)",
                display: activeIndex === 0 ? "none" : "block"
              }}
              onClick={handlePrev}
              aria-label="Previous Image"
              tabIndex={0}
            >
              ‹
            </button>
            {/* Right arrow */}
            <button
              className="carousel-btn next"
              style={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.78)",
                borderRadius: "50%",
                fontSize: "1.5rem",
                width: 36,
                height: 36,
                border: "none",
                zIndex: 3,
                cursor: "pointer",
                boxShadow: "0 1.5px 8px 0 rgba(110,198,246,0.10)",
                display: activeIndex === images.length - 1 ? "none" : "block"
              }}
              onClick={handleNext}
              aria-label="Next Image"
              tabIndex={0}
            >
              ›
            </button>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="pet-carousel-thumbnails"
          style={{
            marginTop: 8,
            display: "flex",
            gap: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {images.map((img, idx) => (
            <img
              key={img + idx}
              src={img}
              alt={alt + " thumbnail"}
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                objectFit: "cover",
                border: idx === activeIndex ? "2.5px solid var(--primary)" : "2px solid #ececec",
                boxShadow: idx === activeIndex ? "0 2px 8px 0 rgba(254,224,102,.09)" : "none",
                opacity: idx === activeIndex ? 1 : 0.7,
                cursor: "pointer",
                transition: "border .19s, opacity .19s"
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ImageCarousel;
