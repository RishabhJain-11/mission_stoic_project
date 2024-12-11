import { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY as string;

export const getStockList = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEY}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock list' });
    }
};

export const getStockDetails = async (req: Request, res: Response): Promise<void> => {
    const { ticker } = req.params;
    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${API_KEY}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: `Error fetching details for ${ticker}` });
    }
};
