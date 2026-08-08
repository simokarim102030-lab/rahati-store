import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Check, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductBySlug } from '../../data/products'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import TrustBar from '../../components/TrustBar/TrustBar'
import OrderForm from '../../components/OrderForm/OrderForm'
import NotFound from '../NotFound/NotFound'
import './Product.css'

const FEATURE_ICONS = ['droplet', 'layers', 'battery-charging', 'gauge']
const SLIDE_INTERVAL = 5000

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const allImages = product ? [product.images.hero, ...product.images.gallery] : []
  const [activeThumb, setActiveThumb] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)

  const goTo = useCallback((index) => {
    setActiveThumb((index + allImages.length) % allImages.length)
  }, [allImages.length])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveThumb(prev => (prev + 1) % allImages.length)
    }, SLIDE_INTERVAL)
  }, [allImages.length])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const handleThumbClick = (i) => {
    goTo(i)
    resetTimer()
  }

  const handlePrev = () => { goTo(activeThumb - 1); resetTimer() }
  const handleNext = () => { goTo(activeThumb + 1); resetTimer() }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { diff > 0 ? handleNext() : handlePrev() }
    touchStartX.current = null
  }

  if (!product) return <NotFound />

  return (
    <div className="prod-page">

      {/* ── HERO ── */}
      <section className="prod-hero">
        <div
          className="prod-hero-img-wrap"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="prod-img-arch" />
          <img
            src={allImages[activeThumb]}
            alt={product.name}
            className="prod-main-img"
          />

          {/* Arrows */}
          <button className="prod-arrow prod-arrow-prev" onClick={handlePrev} aria-label="السابق">
            <ChevronRight size={22} />
          </button>
          <button className="prod-arrow prod-arrow-next" onClick={handleNext} aria-label="التالي">
            <ChevronLeft size={22} />
          </button>

          {/* Dots */}
          <div className="prod-dots">
            {allImages.map((_, i) => (
              <button
                key={i}
                className={`prod-dot ${i === activeThumb ? 'active' : ''}`}
                onClick={() => handleThumbClick(i)}
                aria-label={`صورة ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="prod-hero-info container">
          <span className="prod-category">{product.category}</span>
          <h1 className="prod-title">{product.name}</h1>
          <p className="prod-short-desc">{product.shortDescription}</p>

          <div className="prod-price-row">
            <span className="prod-price">{product.price} {product.currency}</span>
            {product.oldPrice > product.price && (
              <>
                <span className="prod-old">{product.oldPrice} {product.currency}</span>
                <span className="prod-discount-badge">-{product.discount}%</span>
              </>
            )}
          </div>

          {product.features && (
            <ul className="prod-feature-list">
              {product.features.map((f, i) => (
                <li key={i} className="prod-feature-item">
                  <span className="prod-feature-dot"><Check size={12} strokeWidth={3} /></span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <a href="#order-form" className="prod-order-btn">
            اطلب الآن
          </a>
        </div>
      </section>

      {/* ── BENEFITS 2×2 ── */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="prod-features container">
          <div className="prod-features-grid">
            {product.benefits.map((b, i) => (
              <FeatureCard
                key={i}
                icon={FEATURE_ICONS[i % FEATURE_ICONS.length]}
                title={b.title}
                description={b.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── GALLERY THUMBNAILS ── */}
      <section className="prod-gallery container">
        <h2 className="prod-gallery-title">معرض المنتجات</h2>
        <div className="prod-thumbs">
          {allImages.map((img, i) => (
            <button
              key={i}
              className={`prod-thumb ${i === activeThumb ? 'active' : ''}`}
              onClick={() => handleThumbClick(i)}
            >
              <img src={img} alt={`${product.name} ${i + 1}`} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            </button>
          ))}
        </div>
      </section>

      {/* ── DETAILS SECTION ── */}
      <section className="prod-details container">
        <div className="prod-details-card">
          <div className="prod-detail-block">
            <h3 className="prod-detail-heading">عن المنتج</h3>
            <p className="prod-detail-text">{product.description}</p>
          </div>
          {product.usage && (
            <div className="prod-detail-block">
              <h3 className="prod-detail-heading">طريقة الاستعمال</h3>
              <p className="prod-detail-text">{product.usage}</p>
            </div>
          )}
          {product.boxContents && (
            <div className="prod-detail-block prod-box-contents">
              <h3 className="prod-detail-heading">
                <Package size={18} />
                محتوى العلبة
              </h3>
              <p className="prod-detail-text">{product.boxContents}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section id="order-form" className="prod-order container">
        <OrderForm product={product} />
      </section>

      <TrustBar />
    </div>
  )
}
