import { ScanHistory } from "../models/scanHistory.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";
import { User } from "../models/user.model.js";

// Get all history
export const getAllHistory = asyncHandler(async (req, res) => {
    const history = await ScanHistory.find({
        user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            history,
            "History fetched successfully"
        )
    );
});

// Get single history
export const getHistoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const history = await ScanHistory.findOne({
        _id: id,
        user: req.user._id,
    });

    if (!history) {
        throw new ApiError(404, "History not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            history,
            "History fetched successfully"
        )
    );
});

// Delete history
export const deleteHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const history = await ScanHistory.findOne({
        _id: id,
        user: req.user._id,
    });

    if (!history) {
        throw new ApiError(404, "History not found");
    }

    await ScanHistory.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "History deleted successfully"
        )
    );
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params; // param is called "id" in your route

    if (!id) {
        throw new ApiError(400, "User ID is required");
    }

    // Map route param "id" to schema field "firebaseUid"
    const deletedUser = await User.findOneAndDelete({ firebaseUid: id });

    if (!deletedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedUser, "User deleted successfully")
    );
});
