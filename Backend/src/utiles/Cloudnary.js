import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath, folder = "FraudLens") => {
    if (!filePath) {
        throw new Error("File path is required");
    }

    try {
        const response = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "auto",
        });

        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    } finally {
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.error("Failed to delete local file:", err);
        }
    }
};