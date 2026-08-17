import { uploadOnCloudinary } from "../utiles/Cloudnary.js";
import { saveScanHistory } from "../services/history.service.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";
import { qrScan } from "../services/qr.service.js";


export const qrScanner = asyncHandler(async (req, res) => {

    // 1. Get uploaded QR image
    const imagePath = req.file?.path;

    if (!imagePath) {
        throw new ApiError(
            400,
            "QR image is required"
        );
    }


    // 2. Upload image to Cloudinary
    const uploadedImage =
        await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
        throw new ApiError(
            500,
            "Failed to upload QR image"
        );
    }


    // 3. Decode QR + classify + analyze
    const result =
        await qrScan(uploadedImage.secure_url);


    // 4. Save scan history
    // await saveScanHistory({

    //     user: req.user._id,

    //     scanType: "qr",

    //     // AI summary as history input
    //     input:
    //         result.summary ||
    //         "QR data not available",

    //     // Original QR image
    //     image: {
    //         url: uploadedImage.secure_url,
    //         publicId: uploadedImage.public_id,
    //     },

    //     // AI analysis
    //     result: result,

    // });


    // 5. Send response
    return res.status(200).json(

        new ApiResponse(
            200,
            {
                qrImage: {
                    imageUrl: uploadedImage.secure_url,
                    publicId: uploadedImage.public_id,
                },

                analysis: result,
            },
            "QR code analyzed successfully"
        )

    );

});