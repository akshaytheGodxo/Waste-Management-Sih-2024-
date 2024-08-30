const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow specific origins
}));
app.use(express.json({ limit: '10mb' })); // Handle large image data
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/avrutti-Database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const OrderSchema = new mongoose.Schema({
  name: String,
  image: String, // Store the image as a Base64 string
  location: String,
  status: String,

  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

// API route to handle new order submissions
app.post('/request-collection', async (req, res) => {
  const { name, image, location} = req.body;
  const newOrder = new Order({
    name,
    image,
    location,
    status: 'pending',
  });

  try {
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// API route to fetch orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
