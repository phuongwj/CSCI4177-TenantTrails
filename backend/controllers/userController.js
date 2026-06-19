import pool from "../db.js";
import { signToken } from "../middleware/auth.js";

import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Missing required field(s) for signing up." });
    }

    if (password != confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match." });
    }

    const signUpQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(signUpQuery, [name, email, hashedPassword]);

        res.status(201).json({ token: signToken(result.insertId) });
    } catch (error) {
        if (error.code == "ER_DUP_ENTRY") {
            res.status(409).json({ error: "Email address has already been registered." });
            return;
        }

        res.status(500).json({ error: "Error signing up for an account." });
    }
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required field(s) for logging in." });
    }

    const logInQuery = `
        SELECT * FROM users
        WHERE email = ?
    `;

    try {
        const [result] = await pool.query(logInQuery, [email]);

        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result[0];

        const userId = user.id;
        const userEmail = user.email;
        const userPassword = user.password;

        const isMatch = await bcrypt.compare(password, userPassword);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ token: signToken(userId) });
    } catch (error) {
        res.status(500).json({ error: "Error logging in." });
    }
}