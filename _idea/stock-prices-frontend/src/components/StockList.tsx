import React, { useEffect, useState } from 'react';
import { fetchStockList } from '../services/api';

interface Stock {
    ticker: string;
    name: string;
}

interface Props {
    onSelect: (ticker: string) => void;
}

const StockList: React.FC<Props> = ({ onSelect }) => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        const getStocks = async () => {
            const data = await fetchStockList();
            setStocks(data);
        };
        getStocks();
    }, []);

    return (
        <div className="stock-list">
            <h2>Stocks</h2>
            <ul>
                {stocks.map((stock) => (
                    <li key={stock.ticker} onClick={() => onSelect(stock.ticker)}>
                        {stock.name} ({stock.ticker})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockList;
