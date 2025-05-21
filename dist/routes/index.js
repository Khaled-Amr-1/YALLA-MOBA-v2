"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../modules/users/user.route"));
const profile_route_1 = __importDefault(require("../modules/profiles/profile.route"));
const post_route_1 = __importDefault(require("../modules/posts/post.route"));
const router = (0, express_1.Router)();
router.use('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
    });
});
router.use('/users', user_route_1.default);
router.use('/profiles', profile_route_1.default);
router.use('/posts', post_route_1.default);
exports.default = router;
