"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = void 0;
const profile_service_1 = require("./profile.service");
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const parsedUid = parseInt(uid, 10);
        if (isNaN(parsedUid)) {
            res.status(400).json({ error: "ENTER VALID ID" });
            return;
        }
        const { user, posts } = yield (0, profile_service_1.getUserWithPosts)(parsedUid);
        res.status(200).json({ ownerData: user, ownerPosts: posts });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { username, avatar, role } = req.body;
        if (username) {
            const usernameExists = yield (0, profile_service_1.isUsernameTaken)(username, userId);
            if (usernameExists) {
                res.status(409).json({ error: "Username already taken" });
                return;
            }
        }
        yield (0, profile_service_1.updateUserInfo)(userId, { username, avatar, role });
        res.status(200).json({ message: "Profile updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserProfile = updateUserProfile;
