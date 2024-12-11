import express, {Application} from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";

import stockRoutes from './routes/stockRoutes';
import {setupWebSocket} from './utils/websocket';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Web Socket Setup
setupWebSocket(io);

app.use("/api/stocks", stockRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
