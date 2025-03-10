"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const BookingRoutes_1 = __importDefault(require("./routes/BookingRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));

const app = (0, express_1.default)();

// Test endpoint
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'API is working' });
});

// Configure CORS
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://sml-nexgen-git-master-udhais-projects.vercel.app",
            "https://sml-nexgen-n63mrtung-udhais-projects.vercel.app",
            "https://www.fechzo.online"
        ];
        console.log('Request Origin:', origin); // Debug log
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error('Rejected Origin:', origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());

// Define routes
app.use("/api/contact", ContactRoutes_1.default);
app.use("/api/book-service", BookingRoutes_1.default);
app.use("/api/jobs", jobRoutes_1.default);
app.use("/api/applications", applicationRoutes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/users", userRoutes_1.default);

exports.default = app;
