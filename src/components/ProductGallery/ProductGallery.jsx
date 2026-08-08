import { useState } from 'react'
import PlaceholderMedia from '../PlaceholderMedia/PlaceholderMedia'
import './ProductGallery.css'

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0)
  const thumbCount = 4

  return (
    <div className="gallery">
      <div className="gallery-main">
        <PlaceholderMedia aspectRatio="4/5" label={`PRODUCT IMAGE ${active + 1}`} />
      </div>
      <div className="gallery-thumbs">
        {Array.from({ length: thumbCount }).map((_, i) => (
          <button
            key={i}
            className={`thumb-btn ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`صورة ${i + 1}`}
          >
            <PlaceholderMedia aspectRatio="1/1" label={`${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
