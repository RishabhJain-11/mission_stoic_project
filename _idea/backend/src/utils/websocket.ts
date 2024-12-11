import { Server, Socket } from 'socket.io';
import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY as string;

export const setupWebSocket = (io: Server): void => {
    io.on('connection', (socket: Socket) => {
        console.log('Client connected:', socket.id);

        socket.on('subscribeToStock', async (ticker: string) => {
            console.log(`Subscribed to stock: ${ticker}`);
            setInterval(async () => {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
                );
                // @ts-ignore
                const price = response.data['Global Quote']['05. price'];
                socket.emit('stockPriceUpdate', { ticker, price });
            }, 5000); // Emit every 5 seconds
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
