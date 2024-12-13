import React, { useEffect, useState } from 'react';
import { fetchStockDetails } from '../services/api';

interface Props {
    ticker: string;
}

const StockDetails: React.FC<Props> = ({ ticker }) => {
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        const getDetails = async () => {
            const data = await fetchStockDetails(ticker);
            setDetails(data);
        };
        getDetails();
    }, [ticker]);

    if (!details) return <div>Loading...</div>;

    return (
        <div className="stock-details">
            <h3>Stock Details for {ticker}</h3>
            <pre>{JSON.stringify(details, null, 2)}</pre>
        </div>
    );
};

export default StockDetails;
