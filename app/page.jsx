'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, CheckCircle2, ExternalLink, ImagePlus, Menu, ShieldCheck, Star, Trash2, X } from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SR%20GROUPS-45uEjKYZQphUKF3G62hhcZlgriTZEq.jpeg'

function Stars({ value = 0, interactive = false, onChange }) {
  return <div className="stars" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => <button key={star} type={interactive ? 'button' : undefined} className={star <= value ? 'star active' : 'star'} onClick={() => interactive && onChange(star)} aria-label={`${star} star${star > 1 ? 's' : ''}`}><Star size={18} fill="currentColor" /></button>)}
  </div>
}

function Field({ label, required, children, hint }) {
  return <label className="field"><span className="field-label">{label} {required && <b>*</b>}</span>{children}{hint && <span className="field-hint">{hint}</span>}</label>
}

export default function Home() {
  const [rating, setRating] = useState(0)
  const [photo, setPhoto] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const fileRef = useRef(null)

  function handlePhoto(event) {
    const file = event.target.files?.[0]
    if (file?.type.startsWith('image/')) setPhoto({ url: URL.createObjectURL(file), name: file.name })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!rating) return
    if (!form.checkValidity()) { form.reportValidity(); return }
    setSubmitted(true)
    form.reset()
    setRating(0)
    setPhoto(null)
  }

  return <main className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header container">
      <a className="brand" href="#top" aria-label="SR Groups home"><img src={logoUrl} alt="SR Groups logo" /><span><strong>SR GROUPS</strong><small>IT SOLUTIONS & HEALTHCARE</small></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}><a href="#reviews">Reviews</a><a href="#share">Share your experience</a><a className="visit-link" href="https://www.srgroups.company" target="_blank" rel="noreferrer">Visit SR Groups <ExternalLink size={14} /></a></nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={21} /></button>
    </header>

    <section className="hero container" id="top">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> CUSTOMER VOICE / 2024</div><h1>Built around the<br /><em>people</em> we serve.</h1><p>Real perspective from the people and teams who move forward with SR Groups.</p><div className="hero-actions"><a className="button button-gold" href="#share">Share your experience <ArrowUpRight size={17} /></a><a className="text-link" href="#reviews">Explore reviews <span>↓</span></a></div></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-core"><img src={logoUrl} alt="" /></div><span className="orbit-label label-one">IT SOLUTIONS</span><span className="orbit-label label-two">HEALTHCARE</span></div>
    </section>

    <section className="stats-strip container"><div className="stat"><span className="stat-value">—</span><span className="stat-label">Average rating</span></div><div className="stat"><span className="stat-value">0</span><span className="stat-label">Customer reviews</span></div><div className="stat stat-note"><ShieldCheck size={22} /><span>Verified voices.<br /><b>Always authentic.</b></span></div></section>

    <section className="reviews-section container" id="reviews"><div className="section-heading"><div><span className="eyebrow">01 / THE COLLECTIVE</span><h2>What our community<br /><em>has to say.</em></h2></div><p>Every review is a window into a working relationship. We keep them real, thoughtful, and entirely from our customers.</p></div><div className="empty-state"><div className="empty-mark"><span>✦</span></div><h3>Your voice starts the story.</h3><p>There are no reviews here yet. Be the first to share what working with SR Groups has meant for you.</p><a className="text-link" href="#share">Leave the first review <span>→</span></a></div></section>

    <section className="share-section container" id="share"><div className="form-intro"><span className="eyebrow">02 / YOUR EXPERIENCE</span><h2>Make your mark<br />on the <em>story.</em></h2><p>A few thoughtful words can help someone else take their next confident step. Thank you for sharing yours.</p><div className="form-aside"><span className="aside-line" /><span>Reviews are moderated for authenticity<br />and published with your permission.</span></div></div><form className="review-form" onSubmit={handleSubmit}><div className="form-grid"><Field label="Full name" required><input name="name" required placeholder="Your full name" /></Field><Field label="Gmail address" required hint="A Gmail address is required"><input type="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@gmail\.com$" placeholder="you@gmail.com" /></Field><Field label="Company" required><input name="company" required placeholder="Company name" /></Field><Field label="Job role" required><input name="role" required placeholder="Your role" /></Field><Field label="Sector" required><select name="sector" required defaultValue=""><option value="" disabled>Select a sector</option><option>Technology</option><option>Healthcare</option><option>Professional services</option><option>Education</option><option>Other</option></select></Field></div><div className="rating-field"><span className="field-label">Your rating <b>*</b></span><Stars value={rating} interactive onChange={setRating} /><span className="rating-copy">{rating ? `${rating} of 5` : 'Select a rating'}</span></div><Field label="Your review" required><textarea name="review" required minLength="20" rows="5" placeholder="Tell us about your experience with SR Groups..." /></Field><div className="upload-row"><div><span className="field-label">Profile photo <small>(optional)</small></span><span className="field-hint">Help readers put a face to your story.</span></div><input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} hidden />{photo ? <div className="photo-preview"><img src={photo.url} alt="Selected profile preview" /><span>{photo.name}</span><button type="button" onClick={() => setPhoto(null)} aria-label="Remove photo"><X size={16} /></button></div> : <button type="button" className="upload-button" onClick={() => fileRef.current?.click()}><ImagePlus size={17} /> Add photo</button>}</div>{submitted && <div className="success-message"><CheckCircle2 size={19} /><span>Thank you. Your review has been submitted for approval.</span></div>}<button className="button button-gold submit-button" type="submit">Submit review <ArrowUpRight size={17} /></button><p className="privacy-note">By submitting, you confirm this is your genuine experience and agree to our review guidelines.</p></form></section>

    <footer className="site-footer container"><a className="brand footer-brand" href="#top"><img src={logoUrl} alt="SR Groups logo" /><span><strong>SR GROUPS</strong><small>IT SOLUTIONS & HEALTHCARE</small></span></a><span>© 2024 SR Groups</span><a href="https://www.srgroups.company" target="_blank" rel="noreferrer">srgroups.company ↗</a></footer>
  </main>
}

export { Stars, Field }

