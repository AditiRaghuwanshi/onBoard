import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import chatboatRoutes from "./routes/chatboatroutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// };
// app.use(cors(corsOptions));

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://on-board-phi.vercel.app'  // Your Vercel URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Add this for older browsers
};

app.use(cors(corsOptions));

// Add this middleware to handle preflight for all routes
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 8000;

// ✅ call DB connection ONCE before starting server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed", err);
    process.exit(1);
  });
// Add this middleware before your routes
app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function(data) {
        console.log(`📤 Response sent for ${req.method} ${req.path}:`, {
            status: res.statusCode,
            data: data
        });
        oldSend.apply(this, arguments);
    };
    next();
});
// ✅ routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chatboat", chatboatRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB ✅");
});
