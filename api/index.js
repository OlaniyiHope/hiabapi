import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "../routes/auth.js";
import postRoute from "../routes/postRoute.js";
import authRoutes from "../routes/authRoutes.js";
import hiabRoute from "../routes/hiabRoute.js";
import usersRoute from "../routes/users.js";
import propertiesRoute from "../routes/properties.js";
import schoolRoute from "../routes/schoolRoute.js";
import categoriesRoute from "../routes/categories.js";
import roomsRoute from "../routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Connected to vercel app.");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB has disconnected!");
});
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://newsflashapi.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//   });

//middlewares

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods as needed
    allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers as needed
    credentials: true, // Enable CORS credentials (cookies, authorization headers, etc.)
  })
);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api", authRoutes);
app.use("/api", hiabRoute);
app.use("/api", postRoute);
app.use("/api", schoolRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//connect socket io
io.on("connection", (socket) => {
  //console.log('a user connected', socket.id);
  socket.on("comment", (msg) => {
    // console.log('new comment received', msg);
    io.emit("new-comment", msg);
  });
});

server.listen(process.env.PORT || 8000, () => {
  connect();
  console.log("Connected to backend.");
});
export default app;
