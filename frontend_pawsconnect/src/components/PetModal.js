import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ImageCarousel from "./ImageCarousel";
import Map from "./Map";
import useFavorites from "../hooks/useFavorites";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * PetModal Component
 * Modal overlay displaying detailed information (carousel, attributes, actions) about a pet.
 * Props:
 *   open: boolean, controls if the modal is shown
 *   pet: pet object (should contain id, name, breed, age, location, status, description, images, tags, contact info)
 *   onClose: function to close the modal
 */
function PetModal({ open, pet, onClose }) {
  // Always call hooks before any conditional return (per React rules)
  const { isFavorite, toggleFavorite } = useFavorites();

  // Animation for modal closing (fade out) UX polish
  const [animateExit, setAnimateExit] = useState(false);
  const mountedRef = useRef(false);

  // Close with fade out
  const handleBeginClose = () => {
    setAnimateExit(true);
    setTimeout(() => {
      setAnimateExit(false);
      onClose();
    }, 250); // match CSS .modal-exit animation duration
  };

  // Listen for ESC, route to handleBeginClose for fade out
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleBeginClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]); // only needs open

  // Accessibility: Background scroll lock. Always run hook; effect only when open==true
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Prevent animation when remounted for the first time (only for exit not entrance)
  useEffect(() => {
    if (open) mountedRef.current = true;
    else mountedRef.current = false;
    setAnimateExit(false);
  }, [open]);

  if (!open || !pet) return null;

  // Heart icon for modal (same SVG logic as card)
  const HeartIcon = ({ filled = false }) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill={filled ? "var(--secondary, #6ec6f6)" : "none"}
      stroke={filled ? "var(--secondary, #6ec6f6)" : "#bbb"}
      strokeWidth="2.1"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        filter: filled ? "drop-shadow(0 1px 6px #99e4fc44)" : "none"
      }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 25C13.49 25 13.02 24.85 12.61 24.58C8.36 21.69 5 18.82 5 15.41C5 12.91 7.01 11 9.5 11C11.12 11 12.58 11.91 13.33 13.18C13.56 13.56 14.44 13.56 14.67 13.18C15.42 11.91 16.88 11 18.5 11C20.99 11 23 12.91 23 15.41C23 18.82 19.64 21.69 15.39 24.58C14.98 24.85 14.51 25 14 25Z"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={filled ? "var(--secondary, #6ec6f6)" : "none"}
      />
    </svg>
  );

  // Flatten images for demo—accepts image or images (string or array)
  let images = [];
  if (pet.images && Array.isArray(pet.images)) images = pet.images.filter(Boolean);
  else if (pet.image) images = [pet.image];
  else images = [];

  // Compose mailto/whatsapp links as interest actions with pre-filled pet details
  const mailSubject = `Inquiry about ${pet.name}`;
  const mailBody = `Hello,

I'm interested in learning more about ${pet.name}${pet.breed ? " (" + pet.breed + ")" : ""}${
    pet.age ? ", age: " + pet.age : ""
  }${pet.location ? ", location: " + pet.location : ""}.

Please let me know about adoption requirements, next steps, and if the pet is still available.

Thank you!
`;
  let emailHref = pet.contactEmail
    ? `mailto:${pet.contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
    : null;
  let whatsappHref = pet.contactWhatsapp
    ? `https://wa.me/${pet.contactWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hi! I'm interested in ${pet.name}${pet.breed ? " (" + pet.breed + ")" : ""}${
          pet.age ? ", age: " + pet.age : ""
        }${pet.location ? ", location: " + pet.location : ""}. Is this pet available for adoption?`
      )}`
    : null;

  return (
    <div
      className="pet-modal-overlay"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        background: "rgba(34,38,42,0.58)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={handleBeginClose}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      aria-label={`${pet.name} details`}
    >
      <div
        className={
          "pet-modal-content" +
          (animateExit ? " modal-exit" : "")
        }
        style={{
          background: "var(--bg-primary, #fffdfa)",
          color: "var(--text-primary)",
          borderRadius: "var(--radius)",
          minWidth: 320,
          width: "95vw",
          maxWidth: 504,
          boxShadow:
            "0 7px 40px 0 rgba(110,198,246,0.18), 0 2px 8px 0 rgba(254,224,102,.09)",
          padding: "2.1rem 1.6rem 1.4rem 1.6rem",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        {/* Favorites toggle button (heart), top-right, left of close */}
        <button
          className="favorite-btn"
          aria-label={isFavorite?.(pet.id) ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite?.(pet.id) ? "Remove from favorites" : "Add to favorites"}
          onClick={e => { e.stopPropagation(); toggleFavorite(pet.id); }}
          style={{
            position: "absolute",
            right: 58,
            top: 13,
            background: "rgba(255,255,255,0.93)",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            padding: 0,
            boxShadow: "0 2px 9px 0 rgba(110,198,246,0.09)"
          }}
        >
          <HeartIcon filled={isFavorite?.(pet.id)} />
        </button>
        {/* Close Button */}
        <button
          className="pet-modal-close"
          style={{
            position: "absolute",
            right: 18,
            top: 12,
            background: "var(--secondary, #6ec6f6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            fontSize: "1.38rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1.5px 10px 0 rgba(110,198,246,.12)"
          }}
          aria-label="Close"
          onClick={handleBeginClose}
        >
          ×
        </button>
        {/* Image Carousel */}
        <ImageCarousel
          images={images}
          alt={pet.name}
          width="100%"
          height="240px"
        />
        {/* Pet Information */}
        <div style={{ marginTop: ".88em" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65em",
              flexWrap: "wrap"
            }}
          >
            <h2
              style={{
                fontSize: "1.34rem",
                fontWeight: 800,
                margin: "0 0.25em 0 0",
                color: "var(--text-primary)"
              }}
            >
              {pet.name}
            </h2>
            {pet.breed && (
              <span
                style={{
                  fontSize: "1.0rem",
                  background: "var(--accent, #ffd6a5)",
                  color: "#22262a",
                  fontWeight: 600,
                  padding: "0.18em 0.78em",
                  borderRadius: "999px",
                  opacity: ".98"
                }}
              >
                {pet.breed}
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: ".8em",
              margin: "0.3em 0 0.46em 0",
              color: "var(--text-secondary)",
              fontSize: "1.04rem"
            }}
          >
            {pet.age && <span>{pet.age}</span>}
            {pet.location && <span>📍 {pet.location}</span>}
            {pet.status && (
              <span
                style={{
                  background: "var(--primary)",
                  color: "#1a1a1a",
                  borderRadius: "999px",
                  padding: "0.13em 0.85em",
                  fontWeight: 700,
                  fontSize: ".98em",
                  opacity: "0.93"
                }}
              >
                {pet.status}
              </span>
            )}
          </div>
          {pet.tags?.length > 0 && (
            <div
              style={{
                marginTop: "0.17em",
                display: "flex",
                gap: "0.46em",
                flexWrap: "wrap"
              }}
            >
              {pet.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "var(--secondary, #6ec6f6)",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "0.13em 0.85em",
                    fontSize: "0.90em",
                    fontWeight: 500
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Description */}
          <p
            style={{
              margin: "0.72em 0 1.13em 0",
              lineHeight: "1.47",
              fontSize: "1.03em",
              color: "var(--text-secondary, #6b7082)"
            }}
          >
            {pet.description ||
              "This adorable pet is searching for a loving home! Reach out to learn more or schedule a visit."}
          </p>
          {/* Location Map (show if location available) */}
          {pet.location && (
            <div style={{ margin: "1.1em 0 1.27em 0" }}>
              <Map
                location={pet.location}
                height={160}
                style={{ width: "100%", minHeight: 140, borderRadius: "var(--radius)" }}
                className="pawsconnect-detail-map"
              />
            </div>
          )}
          {/* Interest actions */}
          <div
            style={{
              display: "flex",
              gap: "1.1em",
              alignItems: "center",
              marginTop: "0.9em",
              flexWrap: "wrap"
            }}
          >
            {emailHref && (
              <a
                href={emailHref}
                className="btn"
                style={{
                  background: "var(--secondary)",
                  color: "#fff",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "1.04em",
                  padding: ".54em 1.19em"
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Express interest in ${pet.name} by email`}
              >
                ✉️ Email interest
              </a>
            )}
            {whatsappHref && (
              <a
                href={whatsappHref}
                className="btn"
                style={{
                  background: "var(--primary)",
                  color: "#1a1a1a",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "1.04em",
                  padding: ".54em 1.19em"
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Express interest in ${pet.name} by WhatsApp`}
              >
                🐾 WhatsApp
              </a>
            )}
            {/* Custom Contact fallback */}
            {!emailHref && !whatsappHref && (
              <span
                style={{
                  color: "var(--text-secondary, #6b7082)",
                  fontSize: "1.03em"
                }}
              >
                Contact info unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

PetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  pet: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

export default PetModal;
