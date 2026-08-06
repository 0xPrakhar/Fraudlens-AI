import { scanUrl } from "../services/url.service.js";
import { saveScanHistory } from "../services/history.service.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const urlScanner = asyncHandler(async (req, res) => {

    const { url } = req.body;

    if (!url) {
        throw new ApiError(400, "Url is required");
    }

    const response = await scanUrl(url);

    if (!response) {
        throw new ApiError(500, "Server Error");
    }

    // Save Scan History
    await saveScanHistory({
        user: req.user._id,
        scanType: "url",
        input: url,
        result: response,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "URL scanned successfully"
        )
    );

});