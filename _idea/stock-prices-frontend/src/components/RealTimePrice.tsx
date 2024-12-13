import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Props {
    ticker: string;
}

const RealTimePrice: React.FC<Props> = ({ ticker }) => {
    const [price, setPrice] = useState<string | null>(null);

    useEffect(() => {
        const socket: Socket = io('http://localhost:5000');

        socket.emit('subscribeToStock', ticker);

        socket.on('stockPriceUpdate', (data: { ticker: string; price: string }) => {
            if (data.ticker === ticker) setPrice(data.price);
        });

        return () => {
            socket.disconnect();
        };
    }, [ticker]);

    return (
        <div className="real-time-price">
            <h3>Real-Time Price</h3>
            <p>
                {ticker}: {price ? `$${price}` : 'Fetching...'}
            </p>
        </div>
    );
};

export default RealTimePrice;
