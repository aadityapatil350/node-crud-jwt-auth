import  express  from "express";
const router = express.Router();
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


router.post('/register', async (req, res) => {
    try {
        const { userName, password } = req.body;

        //using bcrypt to hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
        res.status(500).json({ error: error });
        }
})

// User login
router.post('/login', async (req, res) => {
    try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
    });
   

export default router;