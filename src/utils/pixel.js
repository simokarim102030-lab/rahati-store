const PIXEL_ID = '1032258209405233'

export const fbq = (...args) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export const trackPageView = () => {
  fbq('track', 'PageView')
}

export const trackViewContent = (product) => {
  fbq('track', 'ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'MAD',
  })
}

export const trackInitiateCheckout = (product, quantity, total) => {
  fbq('track', 'InitiateCheckout', {
    content_ids: [product.id],
    content_name: product.name,
    num_items: quantity,
    value: total,
    currency: 'MAD',
  })
}

export const trackPurchase = (product, quantity, total) => {
  fbq('track', 'Purchase', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    num_items: quantity,
    value: total,
    currency: 'MAD',
  })
}
