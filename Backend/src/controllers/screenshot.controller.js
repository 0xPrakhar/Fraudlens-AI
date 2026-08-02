import { scanScreenShot } from "../services/screenshot.service.js";
import { saveScanHistory } from "../services/history.service.js";
import { uploadOnCloudinary } from "../utiles/Cloudnary.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const screenshotScanner = asyncHandler(async (req, res) => {

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

    // Step 3: Analyze screenshot
    const result = await scanScreenShot(uploadedImage.secure_url);

    // Step 4: Save history
    await saveScanHistory({
        user: req.user._id,
        scanType: "image",
        input: "Screenshot Upload",
        image: {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        },
        result,
    });

    // Step 5: Return response
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                screenshot: {
                    imageUrl: uploadedImage.secure_url,
                    publicId: uploadedImage.public_id,
                },
                analysis: result,
            },
            "Screenshot analyzed successfully"
        )
    );
});

export default screenshotScanner;