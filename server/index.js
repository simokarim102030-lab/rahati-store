require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const XLSX = require('xlsx')
const { pool, initDB } = require('./db')

const app = express()

const MEDIA_DIR = path.join(__dirname, '../dist/media')
fs.mkdirSync(MEDIA_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = path.join(MEDIA_DIR, req.query.folder || '')
    fs.mkdirSync(folder, { recursive: true })
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    cb(null, req.query.name || file.originalname)
  },
})
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } })

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
app.use(express.json())

// Health check
app.get('/api/health', function (req, res) {
  res.json({ status: 'ok' })
})

// Place an order
app.post('/api/orders', async function (req, res) {
  const { customerName, phone, city, address, productId, productName, quantity, unitPrice, total } = req.body
  if (!customerName || !phone || !city || !address || !productId || !quantity) {
    return res.status(400).json({ success: false, error: 'بيانات ناقصة' })
  }
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_name, phone, city, address, product_id, product_name, quantity, unit_price, total) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, created_at',
      [customerName, phone, city, address, productId, productName, quantity, unitPrice, total]
    )
    res.json({ success: true, orderId: result.rows[0].id })
  } catch (err) {
    console.error('Order save error:', err.message)
    res.status(500).json({ success: false, error: 'فشل حفظ الطلب' })
  }
})

// Get all orders
app.get('/api/orders', async function (req, res) {
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
app.get('/api/orders/export', async function (req, res) {
  const secret = req.query.key || req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_KEY) return res.status(401).send('Unauthorized')
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    const rows = result.rows.map(function (o) {
      return {
        full_name: o.customer_name,
        phone: o.phone,
        address: o.city + ' - ' + o.address,
        note: '',
        delivery_note: '',
        price: o.total,
        sku: o.product_id,
        qte: o.quantity,
        date_order: new Date(o.created_at).toLocaleString('fr-MA'),
      }
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Orders')
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
    res.setHeader('Content-Disposition', 'attachment; filename="rahati-orders.xlsx"')
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.send(buf)
  } catch (err) {
    res.status(500).send('Export failed: ' + err.message)
  }
})

// Upload image
app.post('/api/upload', function (req, res, next) {
  const secret = req.query.key || req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' })
  next()
}, upload.single('file'), function (req, res) {
  const folder = req.query.folder ? req.query.folder + '/' : ''
  res.json({ success: true, path: '/media/' + folder + req.file.filename })
})

// Admin page
app.get('/admin', function (req, res) {
  const key = req.query.key
  if (key !== process.env.ADMIN_KEY) return res.status(401).send('<h2>Unauthorized</h2>')
  res.sendFile(path.join(__dirname, 'admin.html'))
})

// Serve React build
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))
app.get('*', function (req, res) {
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = process.env.PORT || 3000
initDB().then(function () {
  app.listen(PORT, function () {
    console.log('RAHATI server running on port ' + PORT)
  })
}).catch(function (err) {
  console.error('DB init failed:', err.message)
  process.exit(1)
})
