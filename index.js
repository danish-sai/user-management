const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./src/DB/db');
const User = require('./src/Schemas/user');
const bcrypt = require('bcrypt');

app.use(express.json());

connectDb();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: { name, email } });
});

app.get('/user', async (req, res) => {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
});
app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id, '-password'); // Exclude password field
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});
app.put('/user/:id', async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingUser = await User.findById(id);
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }  
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }
    existingUser.name = name;
    existingUser.email = email; 
    existingUser.password = hashedPassword;
    await existingUser.save();
    res.status(200).json({ message: 'User updated successfully', user: { name, email } });
}
);


///login 


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});