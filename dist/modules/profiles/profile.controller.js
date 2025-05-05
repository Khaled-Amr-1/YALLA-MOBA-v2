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
exports.getUserProfile = void 0;
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
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfile = getUserProfile;
