// app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/ContactRoutes";
import bookingRoutes from "./routes/BookingRoutes";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'API is working' });
});

// Configure CORS
app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "http://localhost:3000", // Local development
                "https://sml-nexgen-git-master-udhais-projects.vercel.app", // Frontend on Vercel
                "https://sml-nexgen-n63mrtung-udhais-projects.vercel.app", // Another Vercel frontend
                "https://www.fechzo.online" // Additional domain
            ];
            console.log('Request Origin:', origin); // Debug log
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error('Rejected Origin:', origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies and authentication headers
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/api/contact", contactRoutes);
app.use("/api/book-service", bookingRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploads directory
app.use("/api/users", userRoutes); // Register and login routes

export default app;
