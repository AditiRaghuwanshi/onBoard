// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// import chatboatRoutes from "./routes/chatboatroutes.js";
// dotenv.config({});

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// const corsOptions = {
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
// }

// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 8000;

// app.get('/', async(req, res) => {
//     try {

//         await connectDB();
//         res.send('Server is running and database connected successfully!');
//     } catch (error) {
//         console.error('Database connection error:', error);
//         res.status(500).send('Server is running, but failed to connect to the database.');
//     }
// });
// // api's
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);
// app.use("/api/v1/chatboat", chatboatRoutes);



// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// })
























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

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

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
