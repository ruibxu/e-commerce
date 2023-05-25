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
    origin: ["http://localhost:3000"],
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
/*const stripeRouter = require('./routes/stripe-router')
app.use('/stripe', stripeRouter)*/
const favorieRouter = require('./routes/favorite-router')
app.use('/api/favorite', favorieRouter)




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


/*
const PORT = 4000;

app.use(express.json())
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))




app.get('/', function (req, res) {
  res.send('Hello, this is the backend!')
})

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/users", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted")
        }
    })
})



*/