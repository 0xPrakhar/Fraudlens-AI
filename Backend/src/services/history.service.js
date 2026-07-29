import { ScanHistory } from "../models/scanHistory.model.js";
import { ApiError } from "../utils/ApiError.js";

export const saveScanHistory = async ({
    user,
    scanType,
    input,
    image = null,
    result,
}) => {
    try {
        const history = await ScanHistory.create({
            user,
            scanType,
            input,
            image,
            result,
        });

        return history;
    } catch (error) {
        throw new ApiError(
            500,
            error.message || "Failed to save scan history."
        );
    }
};