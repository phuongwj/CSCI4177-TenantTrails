import cloudinary from "../cloudinary.js";

export const uploadImage = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: "No image file provided" });
    }

    try {
        const result = await new Promise((ok, no) =>
            cloudinary.uploader
                .upload_stream({ folder: "tenanttrails" }, (e, r) => (e ? no(e) : ok(r)))
                .end(req.file.buffer)
        );

        res.json({ url: result.secure_url }); // store this url
    } catch (error) {
        res.status(500).json({ error: "Image upload failed" });
    }
}