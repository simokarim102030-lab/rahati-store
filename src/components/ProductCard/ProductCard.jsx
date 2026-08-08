import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="pcard">
      <div className="pcard-img-wrap">
        <div className="pcard-img-bg" />
        <img src={product.images.hero} alt={product.name} className="pcard-img" />
        {product.discount > 0 && (
          <span className="pcard-badge">-{product.discount}%</span>
        )}
      </div>
      <div className="pcard-body">
        <h3 className="pcard-name">{product.name}</h3>
        <p className="pcard-desc">{product.shortDescription}</p>
        <div className="pcard-price-row">
          <span className="pcard-price">{product.price} {product.currency}</span>
          {product.oldPrice > product.price && (
            <span className="pcard-old">{product.oldPrice} {product.currency}</span>
          )}
        </div>
        <div className="pcard-cta">
          <span>تسوق الآن</span>
          <span className="pcard-arrow">←</span>
        </div>
      </div>
    </Link>
  )
}
