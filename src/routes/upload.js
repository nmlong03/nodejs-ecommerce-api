import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { uploadImage } from "../controllers/upload";

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "ASSAngular",
        format: "png",
    }
})

const upload = multer({  storage }); 
router.post("/images/upload", upload.any("images"),  async (req, res) => {

    try {
        const files = req.files;
        const uploadPromises = files.map((file) => {
            // Sử dụng Cloudinary API để upload file lên Cloudinary
            return cloudinary.uploader.upload(file.path);
        });
        const results = await Promise.all(uploadPromises);
        // Trả về kết quả là một mảng các đối tượng chứa thông tin của các file đã upload lên Cloudinary
        const uploadedFiles = results.map((result) => ({
            url: result.secure_url,
            publicId: result.public_id,
        }));
        return res.json({ urls: uploadedFiles });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
});
export default router;