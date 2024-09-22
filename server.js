import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import authRoutes from "./routes/auth.route.js"
import blogRoutes from "./routes/blog.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", protectRoute, blogRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});