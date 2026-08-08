# RAHATI - Quick Start Guide

## 🚀 Dev Server Already Running!

Your project is ready at:
```
http://localhost:5173
```

## 📂 Project Location
```
~/Desktop/RAHATI-STORE/
```

## ✅ What You Have

- ✅ 3 Pre-loaded products with dynamic pages
- ✅ Working cart system (add/remove/quantity)
- ✅ Complete checkout form
- ✅ Order confirmation page
- ✅ Mobile-responsive design
- ✅ RTL Arabic support
- ✅ Premium brand design

## 🎨 Customize Everything

### Change Brand Colors
Edit: `src/styles/variables.css`

```css
--primary: #A66A25;        /* Main button color */
--background: #F1EAE2;     /* Page background */
--cream: #F3ECE3;          /* Card backgrounds */
--success: #4F8A68;        /* Discount badges */
--text: #252525;           /* Text color */
```

### Add Real Product Images
Place images in:
```
public/media/products/
├── advanced-pore-cleanser/
│   ├── hero.png
│   ├── gallery-1.png
│   ├── gallery-2.png
│   └── gallery-3.png
├── ems-face-lifting-device/
│   └── ... (same structure)
└── silicone-cleansing-brush/
    └── ... (same structure)
```

### Edit Product Data
File: `src/data/products.js`

```js
export const products = [
  {
    id: 'pore-cleanser',
    slug: 'advanced-pore-cleanser',
    name: 'منظف المسام المتقدم',
    price: 225,
    oldPrice: 350,
    // ... edit as needed
  }
];
```

## 📱 Test the Site

Visit `http://localhost:5173` and:

1. ✅ Browse homepage
2. ✅ Click "اطلب الآن" on any product
3. ✅ View product details
4. ✅ Add to cart
5. ✅ Go to checkout
6. ✅ Fill form (name, phone 06XXXXXXXX, city, address)
7. ✅ Submit order
8. ✅ View confirmation

## 🏗️ Build for Production

```bash
cd ~/Desktop/RAHATI-STORE
npm run build
```

Deploy the `dist/` folder to your hosting.

## 📂 File Structure Quick Reference

```
src/
├── components/Header/       → Navigation + cart
├── components/Footer/       → Footer links
├── components/Button/       → Reusable buttons
├── pages/Home/              → Homepage
├── pages/Product/           → Product details
├── pages/Checkout/          → Order form
├── pages/OrderSuccess/      → Confirmation
├── context/CartContext.jsx  → Cart state
├── data/products.js         → Products + cities
├── styles/variables.css     → Design tokens
└── App.jsx                  → Routes
```

## 🎯 Key Pages

| URL | Page | Purpose |
|-----|------|---------|
| `/` | Home | Browse products |
| `/product/[slug]` | Product | View details |
| `/checkout` | Checkout | Order form |
| `/order-success` | Success | Confirmation |

## 💡 Tips

- All colors are CSS variables → change one place, update everywhere
- All fonts use Cairo (Google Fonts) for Arabic
- Mobile-responsive → test on all sizes
- RTL is native, not mirrored

## 🔗 Commands

```bash
npm run dev      # Start dev server (already running)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎊 You're All Set!

Your store is fully functional. Just add real images and you're ready to launch.

**Happy selling!** 🚀
