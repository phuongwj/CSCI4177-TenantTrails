import pool from "../db.js";

export const getUserProfile = async (req, res) => {
    const user_id = req.user.id;

    if (!user_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const getUserProfileQuery = `
        SELECT 
            u.name AS userName, u.email, u.initials,
            a.name AS aptName,
            r.id, r.apt_id AS aptId, r.rating, r.body
        FROM users u 
            JOIN reviews r ON u.id = r.user_id 
            JOIN apartments a ON r.apt_id = a.id
        WHERE 
            u.id = ?
    `;

    const getUserCommentsQuery = `
        SELECT
            COUNT(*) as commentCount
        FROM 
            comments
        WHERE
            user_id = ?
    `;

    try {
        const [userProfileResult] = await pool.query(getUserProfileQuery, [user_id]);
        const [userCommentsResult] = await pool.query(getUserCommentsQuery, [user_id]);

        if (userProfileResult.length === 0) {
            return res.status(404).json({ error: "User profile not found." });
        }

        res.status(200).json({ userProfileResult, userCommentsResult });
    } catch (error) {
        res.status(500).json({ error: "Error getting user profile and their reviews" });
    }
}

export const updateReview = async (req, res) => {
    const user_id = req.user.id;
    const review_id = req.params.id;
    const { rating, body } = req.body;

    if (!user_id || !review_id || !rating || !body) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const updateReviewQuery = `
        UPDATE 
            reviews
        SET 
            rating = ?, body = ?
        WHERE 
            reviews.id = ? AND reviews.user_id = ?
    `;

    try {
        const [result] = await pool.query(updateReviewQuery, [rating, body, review_id, user_id]);

        if (result.affectedRows === 0) {
            return res.status(403).json({ error: "Access denied: you do not own this resource" });
        }
        
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Error updating user's review" });
    }
}

export const deleteReview = async (req, res) => {
    const user_id = req.user.id;
    const review_id = req.params.id;

    if (!user_id || !review_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const deleteReviewQuery = `
        DELETE FROM 
            reviews
        WHERE 
            reviews.id = ? and reviews.user_id = ? 
    `;

    try {
        const [result] = await pool.query(deleteReviewQuery, [review_id, user_id]);

        if (result.affectedRows === 0) {
            return res.status(403).json({ error: "Access denied: you do not own this resource" });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Error deleting user's review" }); 
    }
}