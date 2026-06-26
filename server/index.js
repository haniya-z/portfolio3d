const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Contact Message Schema ──
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// ── Routes ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Haniya Portfolio API is live 🚀' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    // Save to MongoDB if connected, else just acknowledge
    if (mongoose.connection.readyState === 1) {
      await Message.create({ name, email, subject, message });
    }
    res.json({ success: true, message: `Thanks ${name}! I'll get back to you soon.` });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

app.get('/api/stats', (req, res) => {
  res.json({
    projects: 3,
    pilots: 3,
    commits: 200,
    coffees: 999
  });
});

// ── Connect & Start ──
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('⚠️  MongoDB not connected (running without DB):', err.message));
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
