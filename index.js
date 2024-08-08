import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors package

// Constants
const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key'; // Use a strong key in production

// // Middleware
// app.use(cors({
//   origin: 'http://127.0.0.1:5500', // Allow requests from this origin
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type']
// }));
app.use(bodyParser.json()); // Parse JSON bodies

// In-memory user storage (for demonstration purposes)
const users = [
//   { email: 'johndoe@example.com', password: 'password123' } // Sample user
];

// Route to handle user signup
// Route to handle user signup
app.post('/signup', (req, res) => {
    const { user, email, password } = req.body;
  
    if (!user || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if the user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Store new user
    users.push({ user, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  });

// Route to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find the user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Route to check server status
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
