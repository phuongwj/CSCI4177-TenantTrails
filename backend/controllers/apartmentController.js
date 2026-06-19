import pool from "../db.js";

export const getAllApartments = async (req, res) => {
    const getAllApartmentsQuery = `
        SELECT 
            a.*,
            ROUND(AVG(r.rating)) AS rating,
            COUNT(r.id) AS reviews
        FROM 
            apartments a LEFT JOIN reviews r
        ON 
            a.id = r.apt_id
        GROUP BY
            a.id  
    `;

    try {
        const [result] = await pool.query(getAllApartmentsQuery);

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: "Error getting all apartments" });
    }
} 

export const getApartmentAndReviews = async (req, res) => {
    const apt_id = req.params.id;

    if (!apt_id) {
        return res.status(400).json({ error: "Missing required fields "});
    }

    const getApartmentAndReviewsQuery = `
        SELECT 
            a.*,
            r.*
        FROM
            apartments a LEFT JOIN reviews r ON a.id = r.apt_id
        WHERE
            a.id = ?
    `;

    try {
        const [result] = await pool.query(getApartmentAndReviewsQuery, [apt_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Apartment not found." });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error getting apartment and their reviews" });
    }
}

export const addReview = async (req, res) => {
    const { rating, body } = req.body;
    
    const apt_id = req.params.id;
    const user_id = req.user.id;

    if (!user_id || !apt_id || !rating || !body) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const addReviewQuery = `
        INSERT INTO reviews (user_id, apt_id, rating, body, created)
        VALUES (?, ?, ?, ?, CURDATE())
    `;

    try {
        const [result] = await pool.query(addReviewQuery, [user_id, apt_id, rating, body]);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error adding review" });
    }
}

export const addComment = async (req, res) => {
    const { content, parent_id } = req.body;

    const user_id = req.user.id;
    const review_id = req.params.id;

    if (!user_id || !content || !review_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const addCommentQuery = `
        INSERT INTO comments (content, parent_id, review_id, user_id)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(addCommentQuery, [content, parent_id || null, review_id, user_id])
    
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error adding comment" });
    }
}