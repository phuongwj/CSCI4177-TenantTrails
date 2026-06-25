import pool from "../db.js";
import { signToken } from "../middleware/auth.js";

import bcrypt from "bcrypt";

function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }


export const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Missing required field(s) for signing up." });
    }

    const initials = getInitials(name);

    if (password != confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match." });
    }

    const signUpQuery = `
        INSERT INTO users (name, email, password, initials)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(signUpQuery, [name, email, hashedPassword, initials]);

        res.cookie("token", 
            signToken(result.insertId),
            {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(201).json({ name, email, initials });
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

        const id = user.id;
        const name = user.name;
        const initials = user.initials;
        const actualPassword = user.password;

        const isMatch = await bcrypt.compare(password, actualPassword);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.cookie("token", 
            signToken(id),
            {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(200).json({ id, email, name, initials });
    } catch (error) {
        res.status(500).json({ error: "Error logging in." });
    }
}