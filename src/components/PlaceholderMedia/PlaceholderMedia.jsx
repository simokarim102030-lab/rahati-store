import './PlaceholderMedia.css'
import { Image } from 'lucide-react'

export default function PlaceholderMedia({ aspectRatio = '4/5', label = 'PRODUCT IMAGE', className = '' }) {
  return (
    <div className={`placeholder-media ${className}`} style={{ aspectRatio }}>
      <div className="placeholder-content">
        <Image size={40} strokeWidth={1.2} />
        <span className="placeholder-label">{label}</span>
      </div>
    </div>
  )
}
