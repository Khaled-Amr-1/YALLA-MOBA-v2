"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    var _a, _b;
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        res
            .status(400)
            .json({ error: ((_b = (_a = error.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || "Invalid input data" });
    }
};
exports.validateSchema = validateSchema;
