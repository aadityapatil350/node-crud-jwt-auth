import express  from "express";
const router = express.Router();
import verifyToken from "../middleware/authMiddleware";


//protected route

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
});

export default router;