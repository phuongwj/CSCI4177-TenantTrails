import jwt from "jsonwebtoken";

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}