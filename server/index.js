const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()

const db = require('./db')

const PORT = process.env.PORT || 4000;


const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../client/build")

app.use(express.static(buildPath))

app.get("*", (req, res) => {

  res.sendFile(
    path.join(buildPath, "index.html"),
    function (err) {
      if (err) {
          res.status(500).send(err)
      }
    }
  );
})



// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000",process.env.FRONTEND_URL,"https://api.stripe.com"],
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





