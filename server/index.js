const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser')


const app = express()

const db = require('./db')

const PORT = process.env.PORT || 4000;

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000","https://api.stripe.com"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

/*
async function syncDatabase() {
    try {
      await db.sync({ force: false })
      console.log('Database synchronized successfully.')
    } catch (error) {
      console.error('Unable to synchronize database:', error)
    }
}
  
syncDatabase()
*/


// REGISTER AND LOGIN ROUTES
const authRouter = require('./routes/auth-router')
app.use('/api/auth', authRouter)
const productRouter = require('./routes/product-router')
app.use('/api/products', productRouter)
const cartRouter = require('./routes/cart-router')
app.use('/api/cart', cartRouter)
const orderRouter = require('./routes/order-router')
app.use('/api/order', orderRouter)
const stripeRouter = require('./routes/stripe-router')
app.use('/api/checkout', stripeRouter)
const favorieRouter = require('./routes/favorite-router')
app.use('/api/favorite', favorieRouter)




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', function (req, res) {
    res.send('Hello, this is the backend!')
  })





