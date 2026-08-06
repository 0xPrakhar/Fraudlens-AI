
import { saveScanHistory } from "../services/history.service.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const qrScanner = asyncHandler(async (req, res) => {

// Step 1: Get uploaded file
    const imagePath = req.file?.path;


    if (!imagePath) {
        throw new ApiError(400, "Screenshot is required");
    }

    // Step 2: Upload to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
        throw new ApiError(500, "Failed to upload image");
    }


});