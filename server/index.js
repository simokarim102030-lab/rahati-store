require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const XLSX = require('xlsx')
const { pool, initDB } = require('./db')

const app = express()

// ── MEDIA STORAGE (persistent volume) ───────────────────
const MEDIA_DIR = process.env.MEDIA_DIR || path.join(__dirname, '../public/media')
fs.mkdirSync(MEDIA_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(MEDIA_DIR, req.query.folder || '')
    fs.mkdirSync(folder, { recursive: true })
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    cb(null, req.query.name || file.originalname)
  },
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
app.use(express.json())

// Serve media from persistent volume
app.use('/media', express.static(MEDIA_DIR))

// ── ROUTES ──────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// Place an order
app.post('/api/orders', async (req, res) => {
  const { customerName, phone, city, address, productId, productName, quantity, unitPrice, total } = req.body
  if (!customerName || !phone || !city || !address || !productId || !quantity) {
    return res.status(400).json({ success: false, error: 'بيانات ناقصة' })
  }
  try {
    const result = await pool.query(
      `INSERT INTO orders
         (customer_name, phone, city, address, product_id, product_name, quantity, unit_price, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING id, created_at`,
      [customerName, phone, city, address, productId, productName, quantity, unitPrice, total]
    )
    res.json({ success: true, orderId: result.rows[0].id })
  } catch (err) {
    console.error('Order save error:', err.message)
    res.status(500).json({ success: false, error: 'فشل حفظ الطلب' })
  }
})

// Get all orders
app.get('/api/orders', async (req, res) => {
  const secret = req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Export orders as Excel
app.get('/api/orders/export', async (req, res) => {
  const secret = req.query.key || req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_KEY) return res.status(401).send('Unauthorized')
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    const rows = result.rows.map(o => ({
      full_name:     o.customer_name,
      phone:         o.phone,
      address:       `${o.city} - ${o.address}`,
      note:          '',
      delivery_note: '',
      price:         o.total,
      sku:           o.product_id,
      qte:           o.quantity,
      date_order:    new Date(o.created_at).toLocaleString('fr-MA'),
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Orders')
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
    res.setHeader('Content-Disposition', `attachment; filename="rahati-orders-${Date.now()}.xlsx"`)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.send(buf)
  } catch (err) {
    res.status(500).send('Export failed: ' + err.message)
  }
})

// Upload image
app.post('/api/upload', (req, res, next) => {
  const secret = req.query.key || req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' })
  next()
}, upload.single('file'), (req, res) => {
  res.json({ success: true, path: `/media/${req.query.folder ? req.query.folder + '/' : ''}${req.file.filename}` })
})

// Admin upload page
app.get('/admin', (req, res) => {
  const key = req.query.key
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).send('<h2>Unauthorized — add ?key=YOUR_ADMIN_KEY to the URL</h2>')
  }
  res.send(`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>RAHATI — لوحة التحكم</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #F1EAE2; padding: 24px; }
    h1 { color: #A66A25; margin-bottom: 24px; }
    h2 { color: #333; margin: 24px 0 12px; font-size: 16px; }
    .card { background: white; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .product { border: 1px solid #e0d6cc; border-radius: 12px; padding: 16px; }
    .product h3 { color: #A66A25; margin-bottom: 12px; font-size: 14px; }
    .img-slot { margin-bottom: 10px; }
    .img-slot label { display: block; font-size: 12px; color: #666; margin-bottom: 4px; }
    .upload-area { border: 2px dashed #A66A25; border-radius: 8px; padding: 10px; text-align: center; cursor: pointer; position: relative; background: #fdf8f3; }
    .upload-area input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
    .upload-area img { max-height: 80px; max-width: 100%; object-fit: contain; }
    .upload-area .placeholder { color: #A66A25; font-size: 12px; }
    .status { font-size: 12px; margin-top: 4px; }
    .status.ok { color: green; }
    .status.err { color: red; }
    .btn { background: #A66A25; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; margin-top: 8px; }
    .btn:hover { background: #8D571D; }
    a.dl { display: inline-block; background: #4F8A68; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <h1>RAHATI — لوحة التحكم</h1>

  <div class="card">
    <h2>⬇️ تحميل الطلبات</h2>
    <a class="dl" href="/api/orders/export?key=${key}">تحميل Excel</a>
  </div>

  <div class="card">
    <h2>🖼️ رفع صور المنتجات</h2>
    <div class="grid">
      ${[
        { id: 'pore-cleanser', name: 'منظف المسام' },
        { id: 'silicone-brush', name: 'فرشاة السيليكون' },
        { id: 'ems-device', name: 'جهاز EMS' },
      ].map(p => `
        <div class="product">
          <h3>${p.name}</h3>
          ${['hero', 'gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'].map(slot => `
            <div class="img-slot">
              <label>${slot}</label>
              <div class="upload-area" id="area-${p.id}-${slot}">
                <input type="file" accept="image/*"
                  onchange="uploadFile(this, 'products/${p.id}', '${slot}.jpeg', '${key}', 'area-${p.id}-${slot}')" />
                <img id="preview-${p.id}-${slot}" src="/media/products/${p.id}/${slot}.jpeg"
                  onerror="this.style.display='none';document.querySelector('.placeholder[data-id=\\'${p.id}-${slot}\\']').style.display='block'"
                  style="display:block" />
                <span class="placeholder" data-id="${p.id}-${slot}" style="display:none">+ رفع صورة</span>
              </div>
              <div class="status" id="status-${p.id}-${slot}"></div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  </div>

  <script>
    async function uploadFile(input, folder, name, key, areaId) {
      const file = input.files[0]
      if (!file) return
      const statusEl = document.getElementById('status-' + areaId.replace('area-', ''))
      statusEl.textContent = 'جاري الرفع...'
      statusEl.className = 'status'
      const fd = new FormData()
      fd.append('file', file)
      try {
        const r = await fetch('/api/upload?key=' + key + '&folder=' + folder + '&name=' + name, { method: 'POST', body: fd })
        const data = await r.json()
        if (data.success) {
          statusEl.textContent = '✅ تم الرفع'
          statusEl.className = 'status ok'
          const preview = document.getElementById('preview-' + areaId.replace('area-', ''))
          preview.src = data.path + '?t=' + Date.now()
          preview.style.display = 'block'
        } else {
          statusEl.textContent = '❌ فشل'
          statusEl.className = 'status err'
        }
      } catch(e) {
        statusEl.textContent = '❌ خطأ في الاتصال'
        statusEl.className = 'status err'
      }
    }
  </script>
</body>
</html>`)
})

// ── SERVE REACT BUILD ────────────────────────────────────
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// ── START ────────────────────────────────────────────────
const PORT = process.env.PORT || 3000

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 RAHATI server running on port ${PORT}`)
  })
}).catch(err => {
  console.error('❌ DB init failed:', err.message)
  process.exit(1)
})
