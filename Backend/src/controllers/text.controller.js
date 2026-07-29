import { scanText } from "../services/text.service.js";
import { saveScanHistory } from "../services/history.service.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const textScanner = asyncHandler(async (req, res) => {

    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Text is required");
    }

    const response = await scanText(text);

    if (!response) {
        throw new ApiError(500, "Server Error");
    }

    // Save Scan History
    await saveScanHistory({
        user: req.user._id,
        scanType: "text",
        input: text,
        result: response,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Text scanned successfully"
        )
    );
});