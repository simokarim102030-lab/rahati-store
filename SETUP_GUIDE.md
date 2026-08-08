# RAHATI Store - Setup Guide

## ✅ Project Status

Your React + Vite + Router project is set up at: `Desktop/RAHATI-STORE`

## 📁 Current Structure

```
RAHATI-STORE/
├── src/
│   ├── styles/
│   │   ├── globals.css (✅ Created)
│   │   ├── variables.css (✅ Created - all design tokens)
│   │   └── rtl.css (✅ Created - RTL support)
│   ├── components/
│   │   ├── PlaceholderMedia/ (✅ Created)
│   │   ├── Button/ (✅ Created)
│   │   ├── Header/ (Todo)
│   │   ├── Footer/ (Todo)
│   │   ├── Hero/ (Todo)
│   │   ├── ProductCard/ (Todo)
│   │   ├── ProductGallery/ (Todo)
│   │   ├── FeatureCard/ (Todo)
│   │   ├── TrustBar/ (Todo)
│   │   └── OrderForm/ (Todo)
│   ├── pages/
│   │   ├── Home/ (Todo)
│   │   ├── Product/ (Todo)
│   │   ├── Checkout/ (Todo)
│   │   ├── OrderSuccess/ (Todo)
│   │   └── NotFound/ (Todo)
│   ├── data/
│   │   └── products.js (✅ Created - 3 products with all data)
│   ├── context/
│   │   └── CartContext.jsx (Todo)
│   ├── App.jsx (✅ Updated - routing configured)
│   └── main.jsx
├── public/
│   └── media/
│       ├── products/ (ready for your images)
│       ├── banners/
│       ├── brand/
│       └── icons/
├── package.json (✅ Updated)
└── vite.config.js
```

## 🚀 Next Steps to Complete the Project

### Step 1: Install Dependencies
```bash
cd ~/Desktop/RAHATI-STORE
npm install
```

### Step 2: Create Context for Cart Management
Create `src/context/CartContext.jsx`:
- useState for cart items
- Add to cart, remove, update quantity
- Persist to localStorage

### Step 3: Create Core Components
1. **Header.jsx** - Logo, nav links, cart icon
2. **Footer.jsx** - Links, trust info, social
3. **Hero.jsx** - Featured product section
4. **ProductCard.jsx** - Reusable product card
5. **ProductGallery.jsx** - Image gallery with thumbnails
6. **FeatureCard.jsx** - Feature showcase cards
7. **TrustBar.jsx** - Trust/benefit badges
8. **OrderForm.jsx** - Checkout form with validation

### Step 4: Create Pages
1. **Home.jsx** - Homepage layout
2. **Product.jsx** - Dynamic product page (uses slug from URL)
3. **Checkout.jsx** - Order form page
4. **OrderSuccess.jsx** - Confirmation page
5. **NotFound.jsx** - 404 page

### Step 5: Add Product Images
- Place images in `/public/media/products/[product-slug]/`
- Hero image: `hero.png`
- Gallery images: `gallery-1.png` through `gallery-4.png`

### Step 6: Test Locally
```bash
npm run dev
```

Visit: `http://localhost:5173`

## 🎨 Design Tokens Already Defined

All colors, spacing, fonts, shadows, and responsive sizes are in `src/styles/variables.css`:

- **Primary Color**: `#A66A25` (warm brown)
- **Background**: `#F1EAE2` (warm cream)
- **Text**: `#252525` (deep charcoal)
- **Success**: `#4F8A68` (soft green)

All spacing uses `--space-*` variables (xs through 3xl)

## 🔧 RTL Support

RTL is fully implemented:
- HTML `dir="rtl"` in App component
- All CSS uses RTL-friendly logical properties
- Arabic typography from Google Fonts (Cairo)

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768–1024px
- **Desktop**: > 1024px

All CSS variables adjust at breakpoints in `variables.css`

## 📝 Product Data Structure

3 products defined in `src/data/products.js`:

1. **منظف المسام** - 225 د.م (was 350)
2. **جهاز شد البشرة** - 245 د.م (was 399)
3. **فرشاة التنظيف** - 192 د.م (was 299)

Each product has:
- Images (placeholder paths)
- Features (4 per product)
- Benefits (with titles & descriptions)
- Rating/reviews

## 🖼️ Placeholder Media

All image placeholders are ready:
- Component: `<PlaceholderMedia />` 
- Accepts: `aspectRatio`, `label`, `className`
- Shows gradient background + icon + text label
- Replace with real images by updating `products.js` image paths

## 🛒 Cart Architecture

Cart will be managed via Context API:
- Add/remove products
- Update quantities
- Calculate totals
- Persist in localStorage
- Pass to checkout

## 💳 Checkout Flow

1. User clicks "اطلب الآن" on product
2. Added to cart (visual feedback)
3. Proceed to checkout (Moroccan cities dropdown, form validation)
4. Submit order
5. Show success page with order details

## 🚫 NOT Done Yet (Intentional)

- **No Backend**: Forms submit to console for now
- **No Payment Gateway**: COD only (cash on delivery)
- **No Database**: All data is static JSON
- **No Email Notifications**: Manual followup via phone

These can be added after frontend is perfect.

## ⚡ Quick Start Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

## 🎯 Priority Checklist

- [ ] Create CartContext.jsx
- [ ] Create Header component
- [ ] Create Footer component
- [ ] Create ProductCard component
- [ ] Create ProductGallery component
- [ ] Create FeatureCard component
- [ ] Create TrustBar component
- [ ] Create OrderForm component
- [ ] Create Home page
- [ ] Create Product page (dynamic routing)
- [ ] Create Checkout page
- [ ] Create OrderSuccess page
- [ ] Test all routes
- [ ] Test mobile responsiveness
- [ ] Add real product images
- [ ] Final visual polish

## 📞 Support

Everything is organized and ready for development. The structure prevents:
- Hardcoded product data
- Duplicate code
- Inconsistent styling
- RTL layout issues
- Responsive design gaps

All CSS variables are centralized. Change one file to update the entire site's colors/spacing.

Start with creating CartContext, then components, then pages. The router is already configured to handle all routes.

**Project is ready for active development!**
