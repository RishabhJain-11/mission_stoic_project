import {Schema, model, Document} from "mongoose";

interface IStock extends Document {
    ticker: string;
    name: string;
    sector?: string;
    industry?: string;
    price?: number;
}

const stockSchema = new Schema<IStock>({
    ticker: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sector: {
        type: String
    },
    industry: {
        type: String
    },
    price: {
        type: Number
    }
});

export default model<IStock>('Stock', stockSchema);