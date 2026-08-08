const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id           SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      phone        VARCHAR(50)  NOT NULL,
      city         VARCHAR(100) NOT NULL,
      address      TEXT         NOT NULL,
      product_id   VARCHAR(100) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      quantity     INTEGER      NOT NULL,
      unit_price   NUMERIC(10,2) NOT NULL,
      total        NUMERIC(10,2) NOT NULL,
      status       VARCHAR(50)  DEFAULT 'pending',
      created_at   TIMESTAMPTZ  DEFAULT NOW()
    )
  `)
  console.log('✅ Database table ready')
}

module.exports = { pool, initDB }
