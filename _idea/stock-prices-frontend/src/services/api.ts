import axios from 'axios';
const APP_BASE_URL = 'https://localhost:3001/api';

export const fetchStockList = async() => {
    const response = await axios.get(`{APP_BASE_URL}/stocks`);
    return response.data;
}

export const fetchStockDetails = async(ticker: string) => {
    const response = await axios.get(`{APP_BASE_URL}/stocks/${ticker}`);
    return response.data;
}